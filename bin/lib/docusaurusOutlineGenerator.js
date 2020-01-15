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
    let folder = {"title": "General", "items": []};
    topics.forEach(topic => {
        console.log("Topic");
        console.log(topic);
        if (topic.topics) {
            // Start a new folder

            // Add current folder into docs based on folder title
            if (folder.items.length > 0)
                docs[folder.title] = folder.items

            folder = {"title": "General inside", "items": []};
            let topicTitle = (options.topicTitleCase) ? tc.toTitleCase(topic.title) : topic.title;
            topicTitle = topicTitle.replace(/ +/g, " ");
            folder.title = topicTitle;

            // Add the the same page as the first item in the list: use Overview as its entry title

            console.log("After just creating a new folder");
            console.log(folder);


            let subcategories = generateTopicCategories(topic.topics, level + 1, options);
            console.log("Subcategories returned");
            console.log(subcategories);
            if (level == 0) {
            subcategories.ids.forEach(o => {
                folder.items.push(o);
            })} else {
                item = getTopicBasename(topic, options);
                folder.items.push(item);
                folder.items.push({
                    "type": "subcategory",
                    "title": folder.title,
                    "ids": 
                })
                folder.title = topicTitle;
                let objectItem = {};
                objectItem[folder.title] = subcategories;
                folder.items.push(objectItem);
            }
            console.log("After adding child topics");
            console.log(folder);
        } else {
            console.log("Pushing a a single topic into items")
            folder.items.push(getTopicBasename(topic, options));
            console.log(folder);
        }
    })

    if (folder.items.length > 0) {
        docs[folder.title] = folder.items;
    }

    console.log("Current folder before returning");
    console.log(folder);
    console.log("Showing docs...")

    // if (level > 0) {
    //     return {
    //         "type": "subcategory",
    //         "title": folder.title,
    //         "ids": folder.items
    //     }
    // }

    console.log(docs)
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