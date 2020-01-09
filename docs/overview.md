---
id: getting-started
---

# Overview

## Install

Install the package globally

```bash
$ npm install markdown-to-docusaurus -g
```

Go to Docusaurus environment and initiate `markdown-to-docusaurus`.

```bash
$ cd docusaurus
$ markdown-to-docusaurus init
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

