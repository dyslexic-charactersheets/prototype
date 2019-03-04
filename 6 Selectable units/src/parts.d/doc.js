register('doc', 'title', {
    title: 'Dyslexic Character Sheets',
    favicon: 'favicon.png',
    sort: true
}, args => {
    var faviconData = getDataURL("images/"+args.favicon);

    return `<!DOCTYPE html>
<html lang='en-GB'>
<head>
<title>${esc(args.title)}</title>
<link id="favicon" rel="shortcut icon" type="image/png" href='${faviconData}' />
<style>
${stylesheet()}
</style>
</head>

<body>
<nav id='nav-pages'>
<a class="skip-link" href="#page-core">Go to character info</a>
<a class="skip-link" href="#page-combat">Go to combat</a>
</nav>

<main>
${render(args.contents)}
</main>

<nav id='screen-buttons'>
<button onclick="window.print();return false;">Print</button>
</nav>
</body>
</html>`;
})
