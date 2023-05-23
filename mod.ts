import app from "./deps.ts";
import { tmpl } from "./tmpl.ts";
import { meta, getDocument, getSummary, getReadme } from "./docs.ts";

app
    .get("/", async ctx => {
        const summary = await getSummary();
        const content = await getReadme();
        return ctx.render(tmpl, { meta, summary, content });
    })
    .get("/*", async ctx => {
        const summary = await getSummary();
        const content = await getDocument(decodeURIComponent(ctx.path));
        return ctx.render(tmpl, { meta, summary, content });
    })
    .listen();