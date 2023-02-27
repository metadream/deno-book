import { core } from "./deps.ts";
import { tmpl } from "./tmpl.ts";
import { meta, getDocument, getSummary, getReadme } from "./docs.ts";

core
    .get("/", async ctx => {
        const summary = await getSummary();
        const content = await getReadme();
        return ctx.render(tmpl, { meta, summary, content });
    })
    .get("/*", async ctx => {
        const summary = await getSummary();
        const content = await getDocument(ctx.path);
        return ctx.render(tmpl, { meta, summary, content });
    })
    .listen();