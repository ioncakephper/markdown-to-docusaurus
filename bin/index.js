#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const markdown = require("markdown").markdown;
const parser = require("html-dom-parser");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const cheerio = require("cheerio");


const program = require("commander");
program
    .command('init')
    .description('create standard local folders and files')
    .action(() => {
        console.log("Initializing...")
    });
program
    .command('build <source>')
    .option("-o, --output <docspath>", "path to output Markdown files", "./docs")
    .description('build Docusaurus documentation Markdown files and sidebar')
    .action((source, command) => {
        let outlineFilename = setMissingExtension(source, ".md");
        console.log(outlineFilename);
        execute(outlineFilename);
    })
    ;

program.parse(process.argv);

// let text = "[Markdown] is a simple text-based [markup language]\n" +
// "created by [John Gruber]\n\n" +
// "[John Gruber]: http://daringfireball.net";

// // var tree = markdown.parse(text);

// // console.log(tree);

// console.log(markdown.toHTML(text));

function execute(outlineFilename) {
    if (fs.existsSync(outlineFilename)) {
        let text = fs.readFileSync(outlineFilename, "utf8");
        let htmlSource = markdown.toHTML(text);
        console.log(htmlSource);

        // let htmlDom = parser(htmlSource);
        // console.log(htmlDom);

        // if (htmlDom.find("ul").length > 0) {
        //     let projectTitle = htmlDom.find("ul")[0].children[0].text();
        //     let topicsOutline = htmlDom.find("ul")[0].find("ul")[0];
        // }

        // const frag = JSDOM.fragment(htmlSource);
        // console.log(frag);
        // console.log(frag.querySelector("ul li").children['0']);
        // console.log(frag.querySelector("ul ul").children);

        console.log("Preparing...");
        const $ = cheerio.load(htmlSource);
        // console.log(cheerio.text($('li', "ul")));

        console.log(cheerio.text($("li", "ul li ul")));

        // console.log($("ul"));
        // console.log($("ul").children[1]);

        let topics = $("ul", "ul li").children()[0];
        console.log(topics);

        // let topics = contertToTopic($("ul", "ul li"))

        let data = {
            "title": "",
            "slug": "",
            "short": "",
            "brief": "",
            "folder": false
        }
        data = topicParser(text);

    }
}

function topicParser(text) {
    let data = {};
    data.title = text.regex(/^(.*)@|^(.*)$/)
}

function findList(dom) {
    var children = [];
    var done = false;
    dom.forEach(item => {
        if (!done) {
            console.log("Current item");
            console.log(item);
            if (item.type == "tag" && item.name == "ul") {
                console.log("Should return a list of items");
                console.log(item.children);
                var children = item.chidren;
                done = true;
                console.log("After collecting...");
                console.log(children);
                // return item.children;
            }
        }
    });
    return [];
}

function setMissingExtension(basename, extension) {
    let ext = path.extname(basename);
    if (ext.length == 0) {
        return basename.trim() + extension.trim();
    }

    return basename.trim();
}



