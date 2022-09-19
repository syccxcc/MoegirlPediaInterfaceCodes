"use strict";
const console = require("../modules/console.js");
console.info("Start initialization...");
const axios = require("../modules/axios.js");
const prefetchTargets = require("./targets.js");
const fs = require("fs");
const path = require("path");

(async () => {
    console.info("prefetchTargets:", prefetchTargets);
    for (const prefetchTarget of prefetchTargets) {
        console.info("target:", prefetchTarget);
        const { name, url, file, appendCode } = prefetchTarget;
        console.info(`[${name}]`, "Start fetching...");
        const { data } = await axios.get(url);
        console.info(`[${name}]`, "Successfully fetched.");
        const code = [
            "/**",
            " * Generated by scripts/prefetch.js",
            " * Options:",
        ];
        for (const [k, v] of Object.entries(prefetchTarget)) {
            code.push(` *     ${k}: ${JSON.stringify(v, null, 1).replace(/\n */g, " ")}`);
        }
        code.push(" */", data);
        if (typeof appendCode === "string") {
            code.push(appendCode);
        }
        code.push("");
        await fs.promises.mkdir(path.dirname(file), {
            recursive: true,
        });
        await fs.promises.writeFile(file, code.join("\n"));
    }
    console.info("Done.");
    process.exit(0);
})();
