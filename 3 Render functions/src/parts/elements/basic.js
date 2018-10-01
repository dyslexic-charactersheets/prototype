const _ = require('lodash');

var nextPageNumber = 1;

function page_furniture() {
    var pageNumber = nextPageNumber++;

    return `
    <div class='page-number'>${pageNumber}</div>
    <div class='copyright-attribution'>
        <p>
        <b>&copy; Marcus Downing &nbsp;
        <a href='https://www.dyslexic-charactersheets.com/'>dyslexic-charactersheets.com</a></b>
        <span>This character sheet uses trademarks and/or copyrights owned by Paizo Publishing, LLC, which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This character sheet is not published, endorsed, or specifically approved by Paizo Publishing. For more information about Paizo's Community Use Policy, please visit <a href='http://paizo.com/communityuse'>paizo.com/communityuse</a>. For more information about Paizo Publishing and Paizo products, please visit <a href='http://paizo.com'>paizo.com</a>.</span>        
        </p>
    </div>`;
}

global.render_page = function(id, contents) {
    var page_class = 'page page--balanced';

    return `<div id='page-${id}' class='${page_class}'>
    ${page_furniture()}
    ${contents.join("\n")}
</div>`;
}

global.render_page__unbalanced = function(id, contents) {
    var page_class = 'page page--unbalanced';

    var pageNumber = nextPageNumber++;

    return `<div id='page-${id}' class='${page_class}'>
    ${page_furniture()}
    ${contents.join("\n")}
</div>`;
}

global.esc = function(content) {
    content = _.escape(content);
    content = content.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;');
    content = content.replace(/—/g, '&mdash;');
    content = content.replace(/&amp;(.+);/, '&$1;');
    return content;
}

// furniture
global.render_header = function(contents) {
    return `<header>${contents.join("\n")}</header>`;
}

// basic items
global.render_p = function(args, content = null) {
    if (_.isString(args) && _.isNull(content)) {
        content = args;
        args = {};
    }

    var p = '<p>';
    if (_.has(args, 'align')) p = `<p class='align-${args.align}'>`;

    return `${p}${esc(content)}</p>`;
}

global.render_prose = function(contents) {
    return `<div class='prose'>${contents.join("\n")}</div>`;
}

global.render_span = function(content) {
    return `<span>${esc(content)}</span>`;
}

global.render_hr = function(args) {
    if (_.has(args, "swash") && args.swash) {
        return "<hr class='hr--swash'>";
    }
    return "<hr>";
}

// headings
global.render_h1 = function(content) {
    return `<h1>${esc(content)}</h1>`;
}

global.render_h2 = function(content) {
    return `<h2>${esc(content)}</h2>`;
}

global.render_h3 = function(content) {
    return `<h3>${(content)}</h3>`;
}

global.render_h4 = function(content) {
    return `<h4>${esc(content)}</h4>`;
}

global.render_h5 = function(content) {
    return `<h5>${esc(content)}</h5>`;
}

global.render_h6 = function(content) {
    return `<h6>${esc(content)}</h6>`;
}

global.render_icon = function(icon, args) {
    var icon_class = 'icon icon-'+icon;
    if (_.has(args, "small") && args.small) icon_class += " icon--small";
    return `<i class='${icon_class}'></i>`;
}

global.render_class_icon = function(icon) {
    return `<div class='class-icon class-icon--${icon}'></div>`
}