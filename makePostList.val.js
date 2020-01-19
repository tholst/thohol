#!/usr/bin/env node

const glob = require("glob");
const matter = require("gray-matter");

const p = new Promise((resolve, reject) => {
    glob("content/blog/*/+([0-9])_*.md", function(er, files) {
        // console.log(files);
        var fm = files
            // parse frontmatter
            .map(matter.read)
            // filter out unpublished articles
            .filter(file => file.data.published)
            // add some meta fields
            .map((file, i) =>
                Object.assign(file.data, {
                    filepath: files[i].replace("content/blog", "."),
                    id: files[i].replace(/^.*\//, "").replace(/\..*$/, "").substring(0, 20)
                })
            );

        // sort reverse chronologically, use "update" date where existing
        fm.sort((a, b) => {
            const aDate = a.updated ? a.updated : a.date;
            const bDate = b.updated ? b.updated : b.date;

            return bDate - aDate;
        });

        resolve({ code: "module.exports = " + JSON.stringify(fm) });
    });
});

module.exports = (options, loaderContext) => {
    return p;
};
