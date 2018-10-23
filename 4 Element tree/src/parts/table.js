const _ = require('lodash');

function tableBodyTemplate_basic(rows, columns) {

}

register('table', {
    "rows": [],
    "columns": [],
    "template": null,
}, args => {
    var cls = elementClass('table', null, args, [ 'zebra', 'collapse' ], [ 'width' ]);

    // columns headings
    var tcols = args.columns.map(th => {
        if (_.isNull(th) || th == '') return '';
        if (_.isString(th)) return renderItem({ type: "label", label: th });
        if (!_.has(th, "type")) return '';
        return renderItem(th);
    });
    tcols = tcols.map(th => `<th>${th}</th>`);

    var thead = '';
    if (tcols.length != 0) {
        thead = `<thead>${tcols.join("\n")}</thead>`;
    }

    // rows template
    var rowCallback;
    if (_.isFunction(args.template)) {
        // console.log("Table row callback: function");
        rowCallback = args.template;
    } else if (_.isArray(args.template)) {
        // console.log("Table row callback: elements");
        rowCallback = function(row) {
            return args.template.map(cell => {
                cell = interpolate(cell, row);
                if (_.isNull(cell)) {
                    return '<td></td>';
                } else {
                    if (_.isString(cell)) cell = { type: "label", label: cell };
                    // console.log("Cell:", cell);
                    if (!_.has(cell, "type")) return '<td></td>';
                    return `<td>${renderItem(cell)}</td>`;
                }
            });
        }
    } else {
        // console.log("Table row callback: direct");
        rowCallback = function(row) {
            return row.map(cell => {
                if (_.isString(cell)) cell = { type: "label", label: cell };
                if (!_.has(cell, "type")) return  '<td></td>';
                return `<td>${renderItem(cell)}</td>`;
            });
        }
    }

    var rows = args.rows;
    if (_.isNumber(rows)) {
        rows = _.fill(Array(rows), {});
    }
    var trows = rows.map(row => {
        return `<tr>${rowCallback(row).join("\n")}</tr>`;
    });
    
    return `<table${cls}>${thead}<tbody>${trows.join("\n")}</tbody></table>`
});