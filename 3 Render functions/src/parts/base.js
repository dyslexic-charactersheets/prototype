global.render_character_sheet = function(css_content, pages) {
    var pages_content = pages.join("\n");

    var title = "3rd Prototype";
    var favicon = dataurl("images/favicon.png");

    return `<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
<link id="favicon" rel="shortcut icon" type="image/png" href='${favicon}' />
<style>
${css_content}
</style>
</head>

<body>
<main>

${pages_content}

</main>

<nav id='screen-buttons'>
<button onclick="window.print();return false;">Print</button>
</nav>

</body>
</html>`;
}