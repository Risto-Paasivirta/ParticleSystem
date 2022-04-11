// Node.js script that minifies the compiled particle system library and measures the size.
// Minification is done using uglify-js (https://www.npmjs.com/package/uglify-js)
// This is only used to test the minified library size. The minified result is NOT published anywhere.

import UglifyJS from "uglify-js";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import glob from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, "min");

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

const pathModularParticleSystemBuild = path.resolve("./dist/");

glob(`${pathModularParticleSystemBuild}/**/*.js`, async function (err, allFilePaths) {
    let srcSize = 0;
    let minifiedSize = 0;

    for (let filePath of allFilePaths) {
        filePath = path.resolve(filePath);
        srcSize += fs.statSync(filePath).size;
        const fileRelativePath = filePath.replace(`${pathModularParticleSystemBuild}${path.sep}`, "");
        // console.log(`\t${fileRelativePath}`);
        const fileContent = fs.readFileSync(filePath).toString();
        const minimized = UglifyJS.minify(fileContent, {});
        const outPath = path.resolve(outDir, fileRelativePath);

        await new Promise((resolve, reject) => {
            fs.ensureFile(outPath, function (err) {
                if (!err) {
                    fs.writeFileSync(outPath, minimized.code);
                    minifiedSize += fs.statSync(outPath).size;
                    resolve();
                }
                reject();
            });
        });
    }

    console.log(
        `Tested UglifyJS (compress + mangle): ${(minifiedSize / 1024).toFixed(1)} kB (down from ${(
            srcSize / 1024
        ).toFixed(1)} kB)`,
    );
});
