
/**
 * @type {{ type: "npm", moduleName: string, gadget: { name: string, fileName: string }, distFilePath: string, version?: string, appendCode?: string, }[]}
 */
export default [
    {
        type: "npm",
        moduleName: "wikiplus-highlight",
        gadget: {
            name: "wikiplus-highlight",
            fileName: "MediaWiki:Gadget-wikiplus-highlight.js",
        },
        distFilePath: "main.js",
    },
    {
        type: "npm",
        moduleName: "luxon",
        gadget: {
            name: "luxon",
            fileName: "MediaWiki:Gadget-luxon.js",
        },
        distFilePath: "build/global/luxon.min.js",
        version: "3",
        appendCode: "window.luxon = luxon;",
    },
    /* {
        type: "npm",
        moduleName: "InPageEdit-v2",
        gadget: {
            name: "InPageEdit-v2",
            fileName: "MediaWiki:Gadget-InPageEdit-v2.js",
        },
        distFilePath: "dist/InPageEdit.js",
    }, */
    {
        type: "npm",
        moduleName: "json5",
        gadget: {
            name: "libJSON5",
            fileName: "MediaWiki:Gadget-libJSON5.js",
        },
        distFilePath: "dist/index.js",
        version: "2",
    },
    {
        type: "npm",
        moduleName: "localforage",
        gadget: {
            name: "localforage",
            fileName: "MediaWiki:Gadget-localforage.js",
        },
        distFilePath: "dist/localforage.js",
        version: "1",
    },
];
