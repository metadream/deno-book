const app = require("nedos");
const doc = require("./doc.js");

app.engine({ root: __dirname });
app.get("/", "tmpl.html", () => {
    const summary = doc.getSummary();
    const content = doc.getReadme();
    return { summary, content };
});
app.get("/*", "tmpl.html", ctx => {
    const summary = doc.getSummary();
    const content = doc.getDocument(ctx.params.wildcard);
    return { summary, content };
});
app.listen();