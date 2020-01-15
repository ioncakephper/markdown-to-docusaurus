const fn = require("./fn");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const tc = require("./tc");

module.exports.generate = function (topics, options) {

    if (!fs.existsSync(options.outpath)) {
        fs.mkdirSync(options.outpath);
    }
    generateTopicFiles(topics, options);

    if (!fs.existsSync(options.websitePath)) {
        fs.mkdirSync(options.websitePath);
    }
    generateSidebarsFile(topics, options);
}

function generateTopicCategories(topics, level, options) {
    var docs = {};
    let folder = { title: "General", items: [] };
    let item = "";
    topics.forEach(topic => {
        if (topic.folder) {
            // push previous topic into the folder
            if (item.length > 0) {
                folder.items.push(item);
            }

            // Store items in the folder
            if (folder.items.length > 0)
                docs[folder.title] = folder.items;
            let topicTitle = (options.topicTitleCase) ? tc.toTitleCase(topic.title) : topic.title;
            topicTitle = topicTitle.replace(/ +/g, " ");
            folder = { title: topicTitle, items: [] };
        }
        item = getTopicBasename(topic, options);
        folder.items.push(item);
        if (topic.topics) {
            let subCategory = generateTopicCategories(topic.topics, level + 1, options);
            folder.items.push(subCategory);
            // for (const key in subCategory) {
            //     subCategory[key].forEach(c => {
            //         folder.items.push(c);                  
            //     });               
            // }
        }
    })

    if (folder.items.length > 0)
        docs[folder.title] = folder.items;

    if (level > 0) {
        return {
            "type": "subcategory",
            "label": folder.title,
            "ids": folder.items
        }
    }
    return docs;
}

function generateSidebarsFile(topics, options) {

    let sidebar = {
        "docs": {
        }
    };

    sidebar.docs = generateTopicCategories(topics, 0, options);

    let result = JSON.stringify(sidebar);
    let sidebarsBasename = "sidebars";
    saveJsonFile(sidebarsBasename, result, options);
}

function saveJsonFile(sidebarsBasename, content, options) {
    sidebarsBasename = fn.setMissingExtension(sidebarsBasename, options.jsonExtension);
    sidebarsBasename = [options.websitePath, sidebarsBasename].join(path.sep);

    fs.writeFileSync(sidebarsBasename, content, "utf8");
}

function getTopicBasename(topic, options) {
    let source = (topic.slug) ? topic.slug : (topic.short) ? topic.short : topic.title;
    return fn.slug(source.trim());
}

function getTopicFilename(topic, options) {
    return fn.setMissingExtension(getTopicBasename(topic, options), options.markdownExtension);
}

function generateTopicFiles(topics, options) {
    topics.forEach(topic => {
        let result = generateFromTemplate("topic", getTopicTemplateData(topic, options), options);
        saveMarkdownFile(getTopicFilename(topic, options), result, options);
        if (topic.topics) {
            generateTopicFiles(topic.topics, options)
        }
    })
}

function generateTopicHeaders(headers, level, options) {
    let content = "";
    headers.forEach(header => {
        let data = {
            "prefix": "#".repeat(level),
            "title": (options.headerTitleCase) ? tc.toTitleCase(header.title).trim() : header.title.trim().replace(/ +/g, " ")
        }
        if (header.headers) {
            data.content = generateTopicHeaders(topic.headers, level + 1, options);
        }
        content += generateFromTemplate("header", data, options);
    })

    return content;
}

function getTopicTemplateData(topic, options) {
    let data = {};
    data.title = (options.topicTitleCase) ? tc.toTitleCase(topic.title.trim()) : topic.title.trim().replace(/ +/g, " ");
    data.slug = getTopicBasename(topic, options);
    if (topic.headers) {
        data.content = generateTopicHeaders(topic.headers, 2, options);
    }
    if (topic.brief)
        data.brief = topic.brief.trim();

    return data;
}

function generateFromTemplate(templateBasename, data, options) {
    templateBasename = fn.setMissingExtension(templateBasename, options.templateExtension);
    templateBasename = [options.templatesPath, templateBasename].join(path.sep);

    let source = fs.readFileSync(templateBasename, "utf8");
    let template = Handlebars.compile(source);

    return template(data);
}

function saveMarkdownFile(markdownBasename, content, options) {
    markdownBasename = fn.setMissingExtension(markdownBasename, options.markdownExtension);
    markdownBasename = [options.outpath, markdownBasename].join(path.sep);
    fs.writeFileSync(markdownBasename, content, "utf8");
}