const _ = require('lodash');

/* Utility functions */

function fieldIdent(fieldid = '', partid = '') {
    if (fieldid == '') {
        return { id: '', name: '', for: '', ident: '' };
    }

    if (partid == '') {
        var ident = ` id='${fieldid}' name='${fieldid}'`;
        var forid = ` for='${fieldid}'`;
        return { id: fieldid, name: fieldid, for: forid, ident: ident };
    }

    var eid = fieldid+"--"+partid;
    var name = fieldid+'['+partid+']';
    var ident = ` id='${eid}' name='${name}'`;
    var forid = ` for='${eid}'`;
    return { id: eid, name: name, for: forid, ident: ident };
}

function fieldRadioIdent(fieldid = '', value = '') {
    if (fieldid == '') {
        return { id: '', name: '', for: '', ident: '' };
    }

    if (value == '') {
        return fieldIdent(fieldid);
    }

    var id = fieldid+'--'+value;
    var ident = ` id='${id}' name='${fieldid}'`;
    var forid = ` for='${id}'`;
    return { id: id, name: fieldid, for: forid, ident: ident };
}


/* Frame callbacks */

function fieldFrame_normal(args, callback) {
    var ident = fieldIdent(args.id);
    var label = args.label ? `<label${ident.for}>${esc(args.label)}</label>` : '';
    var legend = args.legend ? `<legend>${esc(args.legend)}</legend>`: '';

    return `${legend}${label}${callback(args)}`;
}

function fieldFrame_none(args, callback) {
    return callback(args);
}

/* Control callbacks */

function fieldControl_input(args) {
    var ident = fieldIdent(args.id);
    return `<div class='field__item'><input${ident.ident}></div>`;
}

function fieldControl_radio(args) {
    var ident = fieldRadioIdent(args.id, args.value);
    return `<div class='field__item'><input type='radio'${ident.ident}></div>`;
}

function fieldControl_checkbox(args) {
    var ident = fieldIdent(args.id);
    return `<div class='field__item'><input type='checkbox'${ident.ident}></div>`;
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

function fieldControl_progression(args) {

}

function fieldControl_composite(args) {
    return `...`;
}

register('field', {
    frame: 'normal',
    control: 'input',
    value: '',
    label: false,
    legend: false,
    width: "medium",
}, args => {
    var id = elementID('field', args.id);
    var cls = elementClass('field', null, args, [ "output", "icon" ], [ "frame", "control", "align", "size", "width", "icon", "proficiency" ]);

    // Frame
    var frameCallback = fieldFrame_normal;
    switch (args.frame) {
        case 'none': frameCallback = fieldFrame_none; break;
    }

    // Control
    var controlCallback = fieldControl_input;
    switch (args.control) {
        case 'radio': controlCallback = fieldControl_radio; break;
        case 'checkbox': controlCallback = fieldControl_checkbox; break;
        case 'progression': controlCallback = fieldControl_progression; break;
        case 'alignment': controlCallback = fieldControl_alignment; break;
        case 'proficiency': controlCallback = fieldControl_proficiency; break;
        case 'composite': controlCallback = fieldControl_composite; break;
    }

    var innerCallback = function(args) {
        var i = _.has(args, "icon") ? '<i></i>' : '';
        return `<div class='field__inner'>${i}${controlCallback(args)}</div>`;
    };

    // combine the results
    return `<fieldset${id}${cls}>${frameCallback(args, innerCallback)}</fieldset>`;
})