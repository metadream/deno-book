import { dirname } from "./deps.ts";

const __dirname = dirname(import.meta.url.replace(/^file:\/\//, ""));
const tmplFile = __dirname + "/tmpl.html";

async function getTmpl() {
    if (tmplFile.match(/^https?:\/\//)) {
        const response = await fetch(tmplFile);
        return await response.text();
    }
    return await Deno.readTextFile(tmplFile);
}

export const tmpl = await getTmpl();