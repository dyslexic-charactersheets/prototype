<!DOCTYPE html>
<html>
<head>
<title>{{title}}</title>
<link id="favicon" rel="shortcut icon" type="image/png" href='{{{dataurlraw "images/favicon.png"}}}' />
<style>
{{{css}}}
</style>
</head>

<body>
<main>

{{#each pages}}
{{{body}}}
{{/each}}

</main>

<nav id='screen-buttons'>
<button onclick="window.print();return false;">Print</button>
</nav>

</body>
</html>