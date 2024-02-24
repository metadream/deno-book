import { Bootstrap, Server } from "./deps.ts";
import { tmpl } from "./tmpl.ts";
import { meta, getDocument, getSummary, getReadme } from "./docs.ts";

@Bootstrap
export default class {

    constructor(app: Server) {
        app.get("/", async ctx => {
            const summary = await getSummary();
            const content = await getReadme();
            return ctx.render(tmpl, { meta, summary, content });
        });
        app.get("/*", async ctx => {
            const summary = await getSummary();
            const content = await getDocument(decodeURIComponent(ctx.path));
            return ctx.render(tmpl, { meta, summary, content });
        });
    }
}