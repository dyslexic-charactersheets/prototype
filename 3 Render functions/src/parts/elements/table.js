const _ = require('lodash');

global.render_table = function (args, columns, rows, template = null) {
    if (_.isNull(template)) {
        template = function (row) { return row; }
    }

    var table_class = '';
    if (_.has(args, "zebra") && args.zebra) table_class += " table--zebra";
    if (_.has(args, "unlabelled") && args.unlabelled) table_class += " table--unlabelled";

    // header
    var thead;
    if (_.isEmpty(columns)) {
        thead = '';
    } else {
        var thead_cells = [];
        columns.forEach(col => {
            if (_.isNull(col) || col == "")
                thead_cells.push('<th></th>');
            else {
                col = col.replace("\n", "<br>");
                thead_cells.push(`<th><label>${col}</label></th>`);
            }
        });
        var thead = `<thead><tr>
    ${thead_cells.join("\n")}
    </tr></thead>`
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