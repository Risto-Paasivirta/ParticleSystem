/* eslint-disable */
const gulp = require("gulp");
const through2 = require("through2");
const rimraf = require("rimraf");
const Vinyl = require("vinyl");
const path = require("path");

const entryPointDir = ["src/**/*.ts"];

const entrypointGenerator = () =>
    through2.obj(
        {
            objectMode: true,
        },
        (file, _, cb) => {
            if (!this.total) {
                this.total = "";
            }
            if (file.isBuffer()) {
                const f = file.contents.toString();
                const matcher = /^[^\/]* *export\s(?:\w*\s)?(?:type|class|const|interface|enum)\s(\w+)/gm;

                let match;
                const imports = [];
                while ((match = matcher.exec(f)) !== null) {
                    imports.push(match[1]);
                }

                const duplicates = [];
                const duplicateFilter = (v) => {
                    if (duplicates.includes(v)) {
                        return false;
                    } else {
                        duplicates.push(v);
                        return true;
                    }
                };
                const exportedImports = imports.filter(duplicateFilter);
                const imported = `export { ${exportedImports.join(", ")} } from "${file.path
                    .replace(path.join(file.cwd, "src/"), "")
                    .replace(/\.ts$/g, "")
                    .replace(/\\/g, "/")}";\n`;
                if (exportedImports.length > 0) {
                    this.total += imported;
                }
            }
            cb();
        },
        (cb) => {
            cb(null, new Vinyl({ path: "entry.ts", contents: Buffer.from(this.total) }));
            this.total = "";
        },
    );

exports.buildEntry = function () {
    return gulp.src(entryPointDir).pipe(entrypointGenerator()).pipe(gulp.dest("src"));
};

exports.cleanEntry = async function () {
    return await rimraf("src/entry.ts", (err) => {
        if (err) {
            console.log("Error happened during Entry file removal");
        }
        console.log("Entry file has been removed");
    });
};
