register('doc', {
    title: 'Dyslexic Character Sheets',
    favicon: 'favicon.png',
}, args => {
    var faviconData = getDataURL("images/"+args.favicon);

    return `<!DOCTYPE html>
<html>
<head>
<title>${esc(args.title)}</title>
<link id="favicon" rel="shortcut icon" type="image/png" href='${faviconData}' />
<style>
${stylesheet()}
</style>
</head>

<body>
<main>
${render(args.contents)}
</main>

<nav id='screen-buttons'>
<button onclick="window.print();return false;">Print</button>
</nav>
</body>
</html>`;
})