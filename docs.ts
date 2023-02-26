import { resolve, Marked } from "./deps.ts";

const cache = new Map();
const SUMMARY = "SUMMARY.md";
const README = "README.md";

export const getDocument = async function (path: string) {
    console.log('---path1-------', path);
    console.log('---path2-------', resolve(path));

    if (!cache.get(path)) {
        const text = await Deno.readTextFile(resolve(path));

        const a = Marked.parse(text);
        console.log('----------', a);
        cache.set(path, a.content);
    }
    return cache.get(path);
}

export const getSummary = async function () {
    return await getDocument(SUMMARY);
}

export const getReadme = async function () {
    return await getDocument(README);
}