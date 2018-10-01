const _ = require('lodash');

global.render_table = function (args, columns, rows, template = null) {
    if (_.isNull(template)) {
        template = function (row) { return row; }
    }

    var table_class = '';
    if (_.has(args, "zebra") && args.zebra) table_class += " table--zebra";
    if (_.has(args, "unlabelled") && args.unlabelled) table_class += " table--unlabelled";
    if (_.has(args, "narrow") && args.narrow) table_class += " table--narrow";

    // header
    var cols = [];
    var thead;
    if (_.isEmpty(columns)) {
        thead = '';
    } else {
        var thead_cells = [];
        columns.forEach(col => {
            if (_.isString(col)) {
                col = { label: col };
            } else if (_.isNull(col)) {
                col = {};
            }

            // cols
            var label = _.has(col, "label") ? col.label : '';

            if (label == "")
                thead_cells.push('<th></th>');
            else {
                label = label.replace(/\n/g, "<br>");
                thead_cells.push(`<th><label>${label}</label></th>`);
            }
        });
        var thead = `<thead><tr>
    ${thead_cells.join("\n")}
    </tr></thead>`;
        if (!_.isEmpty(cols)) {
            thead = `<colgroup>${cols.join("\n")}</colgroup>${thead}`;
        }
    }


    var tbody_rows = [];
    var tbody = rows.map(row => {
        var cells = template(row);
        cells = cells.map(cell => {
            if (_.isNull(cell))
                return '<td></td>';
            else
                return `<td>${cell}</td>`
        }).join("\n");
        return `<tr>${cells}</tr>`;
    }).join("\n");

    return `<table class='${table_class}'>
${thead}
<tbody>
${tbody}
</tbody>
</table>`;
}