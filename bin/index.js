#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const markdown = require( "markdown" ).markdown;

const program = require("commander");

let text = "[Markdown] is a simple text-based [markup language]\n" +
"created by [John Gruber]\n\n" +
"[John Gruber]: http://daringfireball.net";

// var tree = markdown.parse(text);

// console.log(tree);

console.log(markdown.toHTML(text));


