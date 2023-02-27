"use strict";
const { octokit, octokitBaseOptions } = require("../modules/octokit.js");
const core = require("@actions/core");
(async () => {
    console.info(await octokit.rest.issues.create({
        ...octokitBaseOptions,
        title: "test",
        body: "test",
        labels: ["ci:test"],
    }));
    core.startGroup("process.env");
    core.info(JSON.stringify(process.env, null, 4));
    core.endGroup();
})();
