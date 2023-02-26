import { Denos, __dirname } from "./deps.ts";
import { meta, getDocument, getSummary, getReadme } from "./docs.ts";
const tmpl = __dirname + "/tmpl.html";

Denos
    .get("/", async ctx => {
        const summary = await getSummary();
        const content = await getReadme();
        return ctx.view(tmpl, { meta, summary, content });
    })
    .get("/*", async ctx => {
        const summary = await getSummary();
        const content = await getDocument(ctx.path);
        return ctx.view(tmpl, { meta, summary, content });
    })
    .listen();