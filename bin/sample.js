const docug = require("./lib/docusaurus-outline-generator");

let docSource = {
    "project": "Sample Docusaurus Documentation Outline",
    "topics": [
        {
            "title": "Getting started",
            "brief": "Short description goes here",
            "headers": [
                {
                    "title": "Installation",
                    "brief": "Short description of the installation process",
                    "headers": [
                        {
                            "title": "Getting your installation copy",
                            "brief": "Description of how you get a copy of the installation package"
                        }
                    ]
                }
            ],
            "topics": [
                {
                    "title": "Topic child to Getting started",
                    "brief": "Description goes here"
                }
            ]
        },
        {
            "title": "Building new applications"
        }
    ]
}

let options = {
    "outputPath": "./docs",
    "websitePath": "./website",
    "templatesPath": "./templates",
    "templateExtension": ".handlebars",
    "markdownExtension": ".md",
    "jsonExtension": ".json",
    "topicTitleCase": true,
    "headerTitleCase": true
}

docug.generate(docSource.topics, options);