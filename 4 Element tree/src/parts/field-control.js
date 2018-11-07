const _ = require('lodash');

/* Pick a field control */

global.getFieldControlCallback = function(control, args) {
    switch (control) {
        case 'radio': return fieldControl_radio;
        case 'checkbox': return fieldControl_checkbox;
        case 'progression': return fieldControl_composite;
        case 'alignment': return fieldControl_alignment;
        case 'proficiency': return fieldControl_proficiency;
        case 'composite': return fieldControl_composite;
        default: return fieldControl_input;
    }
}

/* Control callbacks */

function fieldControl_input(args) {
    var ident = fieldIdent(args.id);
    return `<div class='field__item'><input${ident.ident}></div>`;
}

function fieldControl_radio(args) {
    var ident = fieldRadioIdent(args.id, args.value);
    return `<div class='field__item'><input type='radio'${ident.ident}><label${ident.for}></label></div>`;
}

function fieldControl_checkbox(args) {
    var ident = fieldIdent(args.id);
    return `<div class='field__item'><input type='checkbox'${ident.ident}><label${ident.for}></label></div>`;
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

function fieldControl_composite(args) {
    var parts = args.parts;

    var outputParts = parts.map(part => {
        var partArgs = _.defaults({}, part);
        partArgs = _.defaults(partArgs, args);
        var callback = getFieldControlCallback(part.control, partArgs);
        return callback(partArgs);
    });

    if (args.control == 'progression') {
        outputParts = _.flatMap(outputParts, part => [ part, '<label class="field__separator"></label>']);
    }

    console.log("Parts:", outputParts);

    return outputParts.join("");
}
