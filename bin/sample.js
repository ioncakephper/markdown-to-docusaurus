const dog = require("./lib/dog.js");
const docog = require("./lib/docusaurusOutlineGenerator");

let dogInfo = {
    "project": "Documentation Outline Generator Documentation",
    "topics": [
        {
            "title": "Getting      started",
            "brief": "Provides a quick application overview",
            "folder": true,
            "headers": [
                {
                    "title": "Installation"
                },
                {
                    "title": "Verifying installation"
                }
            ],
            "topics": [
                {
                    "title": "Building     your      application",
                    "topics": [
                        {
                            "title": "Child of building your application"
                        }
                    ]
                }
            ]
        }
    ]
}

// dog.generate("sample-documentation_project", dogInfo);

let options = {
    "outpath": "./docs",
    "websitePath": "./website",
    "templatesPath": "./templates",
    "templateExtension": ".handlebars",
    "jsonExtension": ".json",
    "markdownExtension": ".md",
    "topicTitleCase": true,
    "headerTitleCase": true
}

let topics = dogInfo.topics;
docog.generate(topics, options);

