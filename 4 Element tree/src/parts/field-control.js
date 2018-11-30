const _ = require('lodash');

/* Pick a field control */

global.getFieldControlCallback = function(control, args) {
    switch (control) {
        case 'radio': return fieldControl_radio;
        case 'checkbox': return fieldControl_checkbox;
        case 'checkgrid': return fieldControl_checkgrid;
        case 'progression': return fieldControl_composite;
        case 'boost': return fieldControl_boost;
        case 'alignment': return fieldControl_alignment;
        case 'weight': return fieldControl_weight;
        case 'speed': return fieldControl_speed;
        case 'icon': return fieldControl_icon;
        case 'money': return fieldControl_money;
        case 'proficiency': return fieldControl_proficiency;
        case 'composite': return fieldControl_composite;
        default: return fieldControl_input;
    }
}

/* Control callbacks */

function fieldControl_input(args) {
    var ident = fieldIdent(args.id);
    var cls = elementClass("field__item", null, args, [], [ "align", "width" ]);
    var overlay = '';
    if (_.has(args, "overlay") && args.overlay != "")
        overlay = `<span class='field__overlay'>${args.overlay}</span>`;
    var value = (args.value == '') ? '' : ` value='${args.value}'`;
    return `<div${cls}><input${ident.ident}${value}></div>${overlay}`;
}

function fieldControl_radio(args) {
    var ident = fieldRadioIdent(args.id, args.value);
    var cls = elementClass("field__item", null, args, [], [ "align" ]);
    return `<div${cls}><input type='radio'${ident.ident}><label${ident.for}></label></div>`;
}

function fieldControl_checkbox(args) {
    var ident = fieldIdent(args.id);
    var cls = elementClass("field__item", null, args, [], [ "align" ]);
    return `<div${cls}><input type='checkbox'${ident.ident}><label${ident.for}></label></div>`;
}

function fieldControl_checkgrid(args) {
    args = _.defaults(args, {
        max: 10,
        group: 10,
        direction: "horizontal",
        depth: 3,
        value: 0
    });

    var g = args.group;
    if (args.max < args.group) g = args.max;
    var grouplen = Math.ceil(parseFloat(g) / parseFloat(args.depth));
    if (args.direction == "horizontal") {
        args.dir = "h";
        args.w = grouplen;
        args.h = args.depth;
    } else {
        args.dir = "v";
        args.h = grouplen;
        args.w = args.width;
    }


    var checks = [];
    for (var i = 1; i <= args.max; i++) {
        var ident = fieldIdent(args.id, i);
        var checked = (i <= args.value) ? ' checked' : '';
        var cls = elementClass("field__item", null, args, [], []);
        var check = `<div${cls}><input type='checkbox'${ident.ident}${checked}><label${ident.for}></label></div>`;
        checks.push(check);
    }

    var cls = elementClass("field__item-group", null, args, [], [ "dir", "w", "h" ]);
    var groups = _.chunk(checks, args.group).map(ch => `<div${cls}>${ch.join("")}</div>`);
    return groups.join("");
}

function fieldControl_boost(args) {
    args = _.defaults(args, { "plus": true, "minus": true });

    var plus = '';
    if (args.plus) {
        var plusident = fieldIdent(args.id+"--plus");
        plus = `<div class='field__item field--control_boost__item--plus'><input type='checkbox' ${plusident.ident}><label ${plusident.for}></label></div>`
    }
    var minus = '';
    if (args.minus) {
        var minusident = fieldIdent(args.id+"--minus");
        minus = `<div class='field__item field--control_boost__item--minus'><input type='checkbox' ${minusident.ident}><label ${minusident.for}></label></div>`
    }

    return `${minus}${plus}`;
}

function fieldControl_alignment(args) {
    var radios = [ "lg", "ll", "le", "ng", "nn", "ne", "cg", "cn", "ce" ].map(al => {
        var ident = fieldRadioIdent(args.id, args.value);
        return `<div class='field__item field__item-${al}'><input type='radio'${ident.ident}></div>`;
    });

    return `
    <i class='field--alignment__grid'></i>
    <i class='field--alignment__good-icon'></i>
    <i class='field--alignment__evil-icon'></i>
    <i class='field--alignment__lawful-icon'></i>
    <i class='field--alignment__chaotic-icon'></i>

    <label class='field--alignment__good'>Good</label>
    <label class='field--alignment__evil'>Evil</label>
    <label class='field--alignment__lawful'>Lawful</label>
    <label class='field--alignment__chaotic'>Chaotic</label>

    ${radios.join("")}
`;
    // TODO checkboxes
}

function fieldControl_icon(args) {
    var cls = elementClass("field__item", null, args, [ "icon" ], [ ]);
    return `<div${cls}><i class='icon icon-${args.icon}'></i></div>`;
}

function fieldControl_proficiency(args) {
    var ident = fieldIdent(args.id);
    var input = `<input class='field--proficiency__bonus' ${ident.ident}>`;

    return `
    <input type='checkbox' class='field--proficiency__trained'>
    <input type='checkbox' class='field--proficiency__expert'>
    <input type='checkbox' class='field--proficiency__master'>
    <input type='checkbox' class='field--proficiency__legendary'>
    <div class='field__item'>${input}</div>
    <i></i>`;
}

function fieldControl_weight(args) {
    var bulkIdent = fieldIdent(args.id, "bulk");
    var lightIdent = fieldIdent(args.id, "light");

    args.parts = [
        {
            type: "field",
            id: bulkIdent.id,
            align: "right",
            overlay: "B"
        },
        {
            type: "field",
            id: lightIdent.id,
            align: "right",
            width: "tiny",
            overlay: "L"
        }
    ];

    return fieldControl_composite(args);
}

function fieldControl_money(args) {
    args = _.defaults(args, {
        indent: 0,
        digits: 3,
        decimal: 0,
        denomination: "copper",
        value: '',
    });
    var unit = '';
    switch(args.denomination) {
        case 'gold': unit = 'gp'; break;
        case 'silver': unit = 'sp'; break;
        case 'copper': unit = 'cp'; break;
    }
    var overlay = `<span class='field__overlay'>${unit}</span>`;

    var ident = fieldIdent(args.id);
    var cls = elementClass("field__item", null, args, [], [ "digits" ]);
    var value = (args.value == '') ? '' : ` value='${args.value}'`;

    var ticks = [];
    for (var i = 1; i < args.digits; i++) {
        var decimal = (i == args.decimal) ? ' field__tick--decimal' : '';
        ticks.push(`<label class='field__tick field__tick-${i}${decimal}'></label>`);
    }

    return `<div${cls}><input${ident.ident}${value} size='${args.digits}'>${ticks.join("")}</div>${overlay}`;
}

function fieldControl_speed(args) {
    // TODO metric option
    var ftIdent = fieldIdent(args.id, "ft");
    var sqIdent = fieldIdent(args.id, "sq");

    args.parts = [
        {
            type: "field",
            id: ftIdent.id,
            align: "right",
            overlay: "ft"
        }, {
            type: "field",
            id: sqIdent.id,
            align: "right",
            width: "small",
            overlay: "sq"
        }
    ];

    return fieldControl_composite(args);
}

function fieldControl_composite(args) {
    var parts = args.parts;

    var outputParts = parts.map(part => {
        var partArgs = _.defaults({}, part);
        if (_.has(part, "type") && part.type != "field") {
            return renderItem(part);
        }
        partArgs = _.defaults(partArgs, args);
        partArgs.frame = "none";
        var callback = getFieldControlCallback(part.control, partArgs);
        return callback(partArgs);
    });

    if (args.control == 'progression') {
        outputParts = _.flatMap(outputParts, part => [ part, '<label class="field__separator"></label>']);
        outputParts.pop();
    }

    // console.log("Parts:", outputParts);

    return outputParts.join("");
}
