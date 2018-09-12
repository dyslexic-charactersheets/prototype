global.render_section = function (title, contents) {
    return `<section>
<h3>${title}</h3>
<div class='g'>
${contents.join("\n")}
</div>
</section>`;
}

global.render_section__untitled = function (contents) {
    return `<section>
<div class='g'>
${contents.join("\n")}
</div>
</section>`;
}

global.render_section__primary = function (title, contents) {
    return `<section class='section--primary'>
<h3>${title}</h3>
<div class='g'>
${contents.join("\n")}
</div>
</section>`;
}

global.render_article = function (title, contents) {
    return `<section>
<h4>${title}</h4>
<div class='g'>
${contents.join("\n")}
</div>
</section>`;
}