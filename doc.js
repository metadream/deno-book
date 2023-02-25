const { resolve } = require("path");
const { readFileSync } = require("fs");
const marked = require("marked");

const cache = {};
const SUMMARY = "SUMMARY.md";
const README = "README.md";

marked.setOptions({
    baseUrl: "/",
});

exports.getDocument = function (path) {
    if (!cache[path]) {
        try {
            const text = readFileSync(resolve(path), "utf-8");
            cache[path] = marked.parse(text);
        } catch (e) {
            e.message = "Cannot open or parse '" + path + "'.";
            throw e;
        }
    }
    return cache[path];
}

exports.getSummary = function () {
    return this.getDocument(SUMMARY);
}

exports.getReadme = function () {
    return this.getDocument(README);
}