// Node.JS script that parses compiled `modular-particle-system` package files and produces
// dist/entries.js file. It is a compilation of all exports that should be included in the IIFE build

import fs from "fs-extra";
import path from "path";

var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

let pathDist = path.resolve("dist");
if (!pathDist.endsWith(path.sep)) {
    pathDist = pathDist + path.sep;
}
const regexpExport = /export declare (const|class) ([^:=\s]*)/g;

walk(pathDist, (err, results) => {
    const exports = [];
    results = results.filter((filePath) => filePath.endsWith("d.ts"));
    results.forEach((filePath) => {
        const content = fs.readFileSync(filePath).toString();
        const matchAll = Array.from(content.matchAll(regexpExport));
        matchAll.forEach((match) => {
            const name = match[2];
            let file = filePath.replace(pathDist, "").replace(".d.ts", "");
            exports.push({ name, file });
        });
    });

    const entriesFilePath = path.resolve(pathDist, "entries.js");
    let entriesContent = "";
    exports.forEach((exportItem) => {
        const fixedFilePath = `./${exportItem.file}`.replace(path.sep, "/");
        entriesContent += `export { ${exportItem.name} } from "${fixedFilePath}";\n`;
    });
    fs.writeFileSync(entriesFilePath, entriesContent);
    console.log(`Successfully wrote ${entriesFilePath} with ${exports.length} exports`);
});
