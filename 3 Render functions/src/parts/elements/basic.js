const Handlebars = require('handlebars');

global.render_page = function(id, contents) {
    return `
<div id='page-${id}' class='page'>${contents.join("\n")}</div>
    `;
}

// furniture
global.render_header = function(content) {
    return `<header>${content}</header>`;
}

// basic items
global.render_p = function(content) {
    return `<p>${content}</p>`;
}

global.render_span = function(content) {
    return `<span>${content}</span>`;
}

global.render_hr = function(args) {
    return "<hr>";
}

// headings
global.render_h1 = function(content) {
    return `<h1>${content}</h1>`;
}

global.render_h2 = function(content) {
    return `<h2>${content}</h2>`;
}

global.render_h3 = function(content) {
    return `<h3>${content}</h3>`;
}

global.render_h4 = function(content) {
    return `<h4>${content}</h4>`;
}

global.render_h5 = function(content) {
    return `<h5>${content}</h5>`;
}

global.render_h6 = function(content) {
    return `<h6>${content}</h6>`;
}

