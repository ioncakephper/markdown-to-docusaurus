const fs = require("fs");
const fn = require("./fn");
const path = require("path");
const Handlebars = require("handlebars");
const tc = require("./titleCase");

module.exports.generate = function (topics, options) {

    if (topics) {

        if (!fs.existsSync(options.outputPath)) {
            fs.mkdirSync(options.outputPath);
        }
        generateTopicFiles(topics, options);
    }

}

function getTopicTitle(topic, options) {
    let title = topic.title.trim();
    let parts = title.split(/ +/);
    title = parts.join(" ");
    return (options.topicTitleCase) ? tc.toTitleCase(title) : title;
}

function getTopicTemplateData(topic, options) {
    let data = {
        "slug": getTopicBasename(topic, options),
        "brief": topic.brief,
        "title": getTopicTitle(topic, options)
    }
    if (topic.headers) {
        data.content = generateTopicHeaders(topic.headers, 2, options);
    }
    return data;
}

function generateTopicHeaders(headers, level, options) {
    let output = "";
    headers.forEach(header => {

        let title = header.title;
        let parts = title.split(/ +/);
        title = parts.join(" ");
        let data = {
            "prefix": "#".repeat(Math.max(1, level)),
            "title": (options.headerTitleCase) ? tc.toTitleCase(title) : title
        }
        if (header.brief) {
            data.brief = header.brief;
        }
        if (header.headers) {
            data.content = generateTopicHeaders(header.headers, level + 1, options);
        }
        output += generateFromTemplate("header", data, options);
    })
    return output;
}

function getTopicBasename(topic, options) {
    let source = (topic.slug) ? topic.slug : (topic.short) ? topic.short : topic.title;
    return fn.slug(source);
}

function getTopicFilename(topic, options) {
    return fn.setMissingExtension(getTopicBasename(topic, options), options.markdownExtension);
}

function generateTopicFiles(topics, options) {
    topics.forEach(topic => {
        let result = generateFromTemplate("topic", getTopicTemplateData(topic, options), options);
        saveTopicFile(getTopicFilename(topic, options), result, options);
        if (topic.topics) {
            generateTopicFiles(topic.topics, options);
        }
    })
}

function generateFromTemplate(templateBasename, data, options) {

    let filename = fn.setMissingExtension(templateBasename, options.templateExtension);
    filename = [options.templatesPath, filename].join(path.sep);

    let source = fs.readFileSync(filename, "utf8");
    let template = Handlebars.compile(source);

    return template(data);
}

function saveTopicFile(baseName, content, options) {
    let filename = fn.setMissingExtension(baseName, options.markdownExtension);
    filename = [options.outputPath, filename].join(path.sep);
    fs.writeFileSync(filename, content, "utf8");
}