import console from "../modules/console.js";
console.info("Start initialization...");
import fs from "fs";
import path from "path";
import { startGroup, endGroup } from "@actions/core";
import createCommit from "../modules/createCommit.js";
import { exit } from "process";
import jsonModule from "../modules/jsonModule.js";

const gadgetBaseRoot = "src/gadgets";

/**
 * @type { { name: string, gadgets: string[] }[] }
 */
const gadgetsDefinitionList = await jsonModule.readFile(path.join(gadgetBaseRoot, "Gadgets-definition-list.json"));
startGroup("gadgetsDefinitionList:");
console.info(gadgetsDefinitionList);
endGroup();
for (const gadgetDirent of await fs.promises.readdir(gadgetBaseRoot, { withFileTypes: true })) {
    if (!gadgetDirent.isDirectory()) {
        continue;
    }
    const gadget = gadgetDirent.name;
    console.info("gadget:", gadget);
    try {
        /**
         * @type { { _section: string; _files: string[] } }
         */
        const gadgetDefinition = await jsonModule.readFile(path.join(gadgetBaseRoot, gadget, "definition.json"));
        const { _section } = gadgetDefinition;
        const _files = (await fs.promises.readdir(path.join(gadgetBaseRoot, gadget))).filter((file) => [".js", ".css"].includes(path.extname(path.join(gadgetBaseRoot, gadget, file))));
        if (gadgetDefinition._files.filter((file) => !_files.includes(file)).length + _files.filter((file) => !gadgetDefinition._files.includes(file)).length > 0) {
            gadgetDefinition._files = [...gadgetDefinition._files.filter((file) => _files.includes(file)), ..._files.filter((file) => !gadgetDefinition._files.includes(file))];
            await jsonModule.writeFile(path.join(gadgetBaseRoot, gadget, "definition.json"), gadgetDefinition);
            await createCommit(`auto(Gadget-${gadget}): gadget definition updated by gadgetsDefinitionGenerator`);
        }
        console.info(`[${gadget}]`, "_section:", _section);
        let sectionExist = false;
        for (const { name, gadgets } of gadgetsDefinitionList) {
            if (_section === name) {
                sectionExist = true;
                if (!gadgets.includes(gadget)) {
                    console.info(`[${gadget}]`, `_section "${_section}" match, gadgets not includes, push`);
                    gadgets.push(gadget);
                } else {
                    console.info(`[${gadget}]`, `_section "${_section}" match, gadgets includes`);
                }
            } else {
                if (gadgets.includes(gadget)) {
                    console.info(`[${gadget}]`, `_section "${_section}" not match, gadgets includes, remove`);
                    gadgets.splice(gadgets.indexOf(gadget), 1);
                }
            }
        }
        if (!sectionExist) {
            console.info(`[${gadget}]`, "_section not existed, push:", { name: _section, gadgets: [gadget] });
            gadgetsDefinitionList.push({ name: _section, gadgets: [gadget] });
        }
    } catch (err) {
        console.error(`[${gadget}]`, "error:", err);
        exit(1);
    }
}
startGroup("gadgetsDefinitionList final:");
console.info(gadgetsDefinitionList);
endGroup();
await jsonModule.writeFile(path.join(gadgetBaseRoot, "Gadgets-definition-list.json"), gadgetsDefinitionList);
await createCommit("auto: new Gadgets-definition-list.json generated");
console.info("Done.");
