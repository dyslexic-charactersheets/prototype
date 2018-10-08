register('table', {
    "rows": [],
    "columns": [],
    "template": null,
}, args => {
    var cls = elementClass('table', null, args, [ 'zebra' ]);

    var thead = '';
    var trows = [];
    
    return `<table${cls}>${thead}<tbody>${trows.join("\n")}</tbody></table>`
});