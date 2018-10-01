const _ = require('lodash');

global.render_layout = function (layout, columns) {
    var column_content = [];
    columns.forEach(column => {
        column_content.push(`<div class='column'>
${column}
</div>`);
    });
    column_content = column_content.join("\n");

    return `<div class='layout layout-${layout}'>
${column_content}
</div>`;
}

global.render_row = function(args, items = null) {
    if (_.isArray(args) && _.isNull(items)) {
        items = args;
        args = {};
    }

    var row_class = "row";
    if (_.has(args, "unlabelled") && args.unlabelled) row_class += " row--unlabelled";
    if (_.has(args, "lines")) row_class += " row--"+args.lines+"-lines";

    var items_content = items.join("\n");
    return `<div class='${row_class}'>
${items_content}
</div>`;
}

global.render_level_marker = function(level) {
    return `<div class='level-marker'>
    <div class='level-marker__label'>Level</div>
    <div class='level-marker__level'>${level}</div>
    </div>`;
}

global.render_level_block = function(level, items) {
    return `<div class='layout layout-level'>
${render_level_marker(level)}
${items.join("\n")}
</div>`;
}