---
id: getting-started
---

# Overview

## Install

Install the package globally

```bash
$ npm install markdown-to-docusaurus -g
```

Create, if not exists already, a project (e.g. `documentation`) and run `docusaurus-init` in this project. See Docusaurus documentation on creating documentation project.

Change to the `documentation` project, and initiate `markdown-to-docusaurus`.

```bash
$ cd docusaurus
$ markdown-to-docusaurus init
```

## Verifying Installation

In addition to existing files and directories, the documentation project directory will contain additional files and directories:

```code
root-directory
|-- Dockerfile
|-- README.md
|-- docker-compose.yml
|-- markdown-to-docusaurus.md
|-- markdown-to-docusaurus.json
|-- docs
|   |-- doc1.md
|   |-- doc2.md
|   |-- doc3.md
|   |-- exampledoc4.md
|   |-- exampledoc5.md
|-- templates
|   |-- topic-template.handlebars
|   |-- header-template.handlebars
|-- website
|   |-- sidebars.json
```

## Build Documentation Files

Open `markdown-to-docusaurus.md` to view the default documentation outline.

```markdown
* Documentation outline project
  * Getting Started @folder @short Overview
    * *Install*
    * *Build Documentation Files*
    * to be defined later
```

Make no changes yet, but close the file. Then, build documentation files and sidebar file.

```bash
$ markdown-to-docusaurus build
```

This command uses the outline stored in `markdown-to-docusaurus.md` and builds Markdown (`.md`) files in `.docs` folder and documentation sidebar in `website/sidebar.js`

In `docs` you will find the `overview.md` file, and in `website` folder, you will find the `sidebars.json` which looks like this:

```json
{
    "docs": {
        "Getting Started": [
            "overview"
        ]
    }
}
```

