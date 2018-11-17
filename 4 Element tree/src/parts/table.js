const _ = require('lodash');

function tableBodyTemplate_basic(rows, columns) {

}

register('table', {
    "rows": [],
    "repeat": 1,
    "columns": [],
    "template": null,
}, args => {
    var cls = elementClass('table', null, args, [ 'zebra', 'collapse' ], [ 'width' ]);

    // columns headings
    var cols = args.columns.map(th => {
        if (_.isNull(th)) return { type: 'label', label: '' };
        if (_.isString(th)) return { type: 'label', label: th, misc: (th == "Misc") };
        return th;
    })
    var tcols = cols.map(renderItem);
    // var tcols = args.columns.map(th => {
    //     if (_.isNull(th) || th == '') return '';
    //     if (_.isString(th)) return renderItem({ type: "label", label: th });
    //     if (!_.has(th, "type")) return '';
    //     return renderItem(th);
    // });
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
            var templateCells = _.flatMap(args.template, cell => {
                if (_.isPlainObject(cell) && _.has(cell, "type") && cell.type == "calc") {
                    var fields = _.clone(cell.inputs);
                    fields.unshift({
                        "type": "span",
                        "content": "=",
                    });
                    var output = _.defaults(cell.output, { "output": true });
                    fields.unshift(output);
                    return fields;
                }
                return [ cell ];
            });

            return templateCells.map((cell, i) => {
                cell = interpolate(cell, row);
                if (_.isNull(cell)) {
                    return '<td></td>';
                } else {
                    if (_.isString(cell)) cell = { type: "label", label: cell };
                    // console.log("Cell:", cell);
                    if (!_.has(cell, "type")) {
                        return '<td></td>';
                    }

                    var col = args.columns[i];
                    // console.log("Cell:", cell, "+", col);
                    var cell = _.defaults({}, cell, col, { type: 'label', label: '' });
                    // console.log("  =", cell);
                    var cellCls = elementClass('td', null, cell, [], ['align']);
                    return `<td${cellCls}>${renderItem(cell)}</td>`;
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
    if (args.repeat > 1) {
        if (_.isEmpty(rows)) {
            rows = [{}];
        }
        // console.log("Repeating row:", rows, "x", args.repeat);
        var repeatedRows = [];
        for (var i = 0; i < args.repeat; i++) {
            repeatedRows = repeatedRows.concat(rows);
        }
        rows = repeatedRows;
    }
    // console.log("Rows:", rows);

    var trows = rows.map(row => {
        return `<tr>${rowCallback(row).join("\n")}</tr>`;
    });
    
    return `<table${cls}>${thead}<tbody>${trows.join("\n")}</tbody></table>`
});