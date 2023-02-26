import { resolve, Marked } from "./deps.ts";

const cache = new Map();
const SUMMARY = "SUMMARY.md";
const README = "README.md";

export const meta = {
    name: "Docsee", title: "",
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M16.19 2H7.82C4.17 2 2 4.17 2 7.81V16.18C2 19.82 4.17 21.99 7.81 21.99H16.18C19.82 21.99 21.99 19.82 21.99 16.18V7.81C22 4.17 19.83 2 16.19 2Z' fill='%23ffd82c'/%3E%3Cpath d='M16.25 2.0002V12.42C16.25 13.06 16.06 13.54 15.73 13.73C15.39 13.93 14.85 13.83 14.25 13.47L12.93 12.68C12.42 12.37 11.58 12.37 11.07 12.68L9.75 13.47C9.15 13.83 8.61 13.92 8.27 13.73C7.94 13.54 7.75 13.06 7.75 12.42V2.00027C7.77327 2.00009 7.79661 2 7.82 2H16.19C16.21 2 16.23 2.00007 16.25 2.0002Z' fill='%23eb3339'/%3E%3C/svg%3E",
    footer: "Powered by <a target=\"_blank\" href=\"https://github.com/metadream/docsee\">Docsee</a>"
}

export const getDocument = async function (path: string) {
    path = path.replace(/^[\/]*/, "");

    if (!cache.get(path)) {
        try {
            const text = await Deno.readTextFile(resolve(path));
            const markup = Marked.parse(text);
            cache.set(path, markup.content);

            if (path == SUMMARY) {
                Object.assign(meta, markup.meta);
            } else {
                const match = markup.content.match(/<h1.*>(.+)<\/h1>/);
                if (match) meta.title = match[1]
            }
        } catch (e) {
            e.message = `Cannot find or open document "${path}".`;
            throw e;
        }
    }
    return cache.get(path);
}

export const getSummary = async function () {
    const summary = await getDocument(SUMMARY);
    const logo = `<a href="/" class="logo"><img src="${meta.logo}"/><span>${meta.name}</span></a><hr>`;
    const footer = `<hr><footer>${meta.footer}</footer>`;
    return logo + summary + footer;
}

export const getReadme = async function () {
    return await getDocument(README);
}