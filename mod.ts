import { Denos } from "./deps.ts";
import { meta, getDocument, getSummary, getReadme } from "./docs.ts";

import { dirname } from "https://deno.land/std@0.177.0/path/mod.ts";

const url = import.meta.url.replace(/^file:\/\//, "");
console.log("url==========", url);
const __dirname = dirname(url);
console.log("__dirname==========", __dirname);



console.log("Deno.mainModule-----", Deno.mainModule);
console.log("Deno.cwd()-----", Deno.cwd());


const tmpl = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"/>
  <link rel="icon" href="{{= meta.logo }}"/>
  <title>{{= meta.title ? meta.title + ' - ' : '' }}{{= meta.name }}</title>
  <style>
  @font-face { font-family: Poppins; src: local('Poppins Light'), local('Poppins-Light'), url(//cdn.unpkg.net/frontend/font/poppins-light.woff2) format('woff2'); }
  @font-face { font-family: 'JetBrains Mono'; src: local('JetBrains Mono Light'), local('JetBrains-Mono-Light'), url(//cdn.unpkg.net/frontend/font/jetbrains-mono.woff2) format('woff2'); }
  * { box-sizing: border-box; }
  body { margin: 0; height: 100vh; display: flex; color: #3b454e; font: 15px/1.8 Poppins; overflow: hidden; }
  main { flex: 1; padding: 5%; overflow: auto; }
  h1 { color: #00ad5d; }
  h2 { color:#4688f4; }
  hr { border: none; height: 1px; margin: 20px 0 10px; background: #eee; }
  ul, ol { padding-left: 20px; }
  img { display: block; max-width: 100%; }
  a { color:#666; text-decoration: none; }
  a:hover { color:#333; text-decoration: underline; }
  a.actived { color: #333; font-weight:700; }
  p:first-child, h1:first-child, h2:first-child { margin-top: 0; }
  p:last-child { margin-bottom: 0; }
  code { font-family: 'JetBrains Mono'; font-size: 14px; background: #f6f6f6; margin: 0 3px; padding: 3px 6px; border-radius: 3px; }
  pre { padding: 15px 20px; background: #f6f6f6; border-radius: 5px; overflow-x: auto; }
  pre code { margin: 0; padding: 0; }
  pre::-webkit-scrollbar { height: 5px; }
  pre::-webkit-scrollbar-thumb { background: #ddd; }
  blockquote { border-left: #eee 4px solid; padding-left: 15px; margin: 0; color: #999; }
  table { width: 100%; border-collapse: collapse; border: #eee 1px solid; }
  table thead { background: #f6f6f6; }
  table tr { border-top: #eee 1px solid; }
  table th, table td { padding: 5px 10px; border-left: #eee 1px solid; }
  aside { width: 300px; height: 100%; padding: 20px; background: #fff; border-right: #ddd 1px solid; overflow: auto; }
  aside::-webkit-scrollbar { width: 5px; }
  aside::-webkit-scrollbar-thumb { background: #eee; }
  aside ul, aside ol { margin: 0; }
  aside li { margin: 5px 0; }
  aside h1 { font-size: 18px; }
  aside h2 { font-size: 16px; margin: 20px 0 10px; }
  aside h3 { font-size: 15px; }
  footer { font-size: 13px; color: #999; text-align: center; margin-bottom: -10px; }
  .logo { display: flex; justify-content: center; align-items: center; }
  .logo img { width: 64px; height: 64px; }
  .logo span { font-size: 32px; margin-left: 15px; color: #555; }
  .logo:hover { text-decoration: none; }
  </style>
</head>
<body>
<aside>{{= summary }}</aside>
<main>{{= content }}</main>
</body>
</html>

<script>
if (location.pathname != "/") {
  const link = document.querySelector("aside a[href='" + location.pathname + "']");
  link.className = "actived";
  link.scrollIntoView({ block: "center" });
}
</script>
`;

Denos
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