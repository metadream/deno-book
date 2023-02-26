import { Denos } from "./deps.ts";
import { getDocument, getSummary, getReadme } from "./docs.ts";

Denos.get("/", async ctx => {
    const summary = await getSummary();
    const content = await getReadme();
    return ctx.view("tmpl.html", { summary, content });
});
Denos.get("/*", async ctx => {
    console.log('000000', ctx.params);
    const summary = await getSummary();
    const content = await getDocument(ctx.params.wildcard);
    return ctx.view("tmpl.html", { summary, content });
});
Denos.listen();