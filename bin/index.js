#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const markdown = require( "markdown" ).markdown;

const program = require("commander");
program
    .command('init')
    .description('create standard local folders and files')
    .action(() => {
        console.log("Initializing...")
    });
program
    .command('build [source]')
    .option("-o, --output <docspath>", "path to output Markdown files", "./docs")
    .description('build Docusaurus documentation Markdown files and sidebar')
    .action((source, command) => {
        console.log(source);
        console.log(command.output);
    })
    ;

program.parse(process.argv);

let text = "[Markdown] is a simple text-based [markup language]\n" +
"created by [John Gruber]\n\n" +
"[John Gruber]: http://daringfireball.net";

// var tree = markdown.parse(text);

// console.log(tree);

console.log(markdown.toHTML(text));


