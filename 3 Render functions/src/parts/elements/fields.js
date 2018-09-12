const _ = require('lodash');

function render_alignment_field(id, args) {
    return `<fieldset class='field--alignment' id='field-${id}'>
    <span class='field--alignment__grid'></span>
    <span class='field--alignment__good-icon'></span>
    <span class='field--alignment__evil-icon'></span>
    <span class='field--alignment__lawful-icon'></span>
    <span class='field--alignment__chaotic-icon'></span>

    <label class='field--alignment__good'>Good</label>
    <label class='field--alignment__evil'>Evil</label>
    <label class='field--alignment__lawful'>Lawful</label>
    <label class='field--alignment__chaotic'>Chaotic</label>
</fieldset>`;
}

function render_radio_field(id, args) {
    return `<input type='radio' id='${id}' name='${id}'>`;
}

function render_checkbox_field(id, args) {
    var field_class = "field field--checkbox";

    var legend = _.has(args, "legend") ? `<h6>${args.legend}</h6>` : '';
    var label = _.has(args, "label") ? `<label>${args.label}</label>` : '';

    return `<fieldset class='${field_class}'>
${legend} <input type='checkbox' id='${id} name='${id}'> ${label}
</fieldset>`;
}

function render_proficiency_field(id, args) {
    var field_class = "field field--icon field--proficiency";

    if (_.has(args, "proficiency")) field_class += " field--proficiency--"+args.proficiency;

    var legend = _.has(args, "legend") ? `<legend>${args.legend}</legend>` : '';
    var label = _.has(args, "label") ? `<label>${args.label}</label>` : '';

    var input_output = (_.has(args, "output") && args.output) 
        ? `<output class='field--proficiency__bonus'>&nbsp;</output>`
        : `<input class='field--proficiency__bonus'>`;

    return `<fieldset class='${field_class}'>
    ${legend} ${label}
    <input type='checkbox' class='field--proficiency__trained'>
    <input type='checkbox' class='field--proficiency__expert'>
    <input type='checkbox' class='field--proficiency__master'>
    <input type='checkbox' class='field--proficiency__legendary'>
    ${input_output}
    <i></i>
</fieldset>`
}

function render_speed_field(id, args) {
    var field_class = "field field--speed";

    var legend = _.has(args, "legend") ? `<legend>${args.legend}</legend>` : '';
    var label = _.has(args, "label") ? `<label>${args.label}</label>` : '';

    return `<fieldset class='${field_class}'>
    ${legend} ${label}
    <fieldset class='subfield subfield--ft'>
        <input>
        <span class='overlay'>ft</span>
    </fieldset>
    <fieldset class='subfield subfield--sq'>
        <input>
        <span class='overlay'>sq</span>
    </fieldset>
</fieldset>`
}

global.render_field = function(id, args = null) {
    if (_.isObject(id) && _.isNull(args)) {
        args = id;
        id = null;
    }

    // special field types
    if (_.has(args, "template")) {
        switch (args.template) {
            case 'alignment': return render_alignment_field(id, args);
            case 'radio': return render_radio_field(id, args);
            case 'checkbox': return render_checkbox_field(id, args);
            case 'proficiency': return render_proficiency_field(id, args);
            case 'speed': return render_speed_field(id, args);
        }
    }

    var field_class = "field";
    ["ref", "box", "unlabelled", "temp", "wide", "mod", "horizontal", "progression"].forEach(adj => {
        if (_.has(args, adj) && args[adj]) field_class += " field--"+adj;
    })

    if (_.has(args, "align")) field_class += " align-"+args.align;
    if (_.has(args, "width")) field_class += " field--"+(args.width == 2 ? 'double' : (args.width == 3 ? 'triple' : ("width-"+args.width)));
    if (_.has(args, "h_label") && args.h_label) field_class += " field--h-label";

    var icon = '';
    if (_.has(args, "icon")) { 
        field_class += " field--icon field--icon--"+args.icon;
        icon = '<i></i>';
    }

    var field_legend = _.has(args, "legend") ? ((l) => { l = l.replace(/\n/g, '<br>'); return `<legend>${l}</legend>` })(args.legend) : '';
    var field_label = _.has(args, "label") ? ((l) => { l = l.replace(/\n/g, '<br>'); return `<label for='${id}'>${l}</label>` })(args.label) : '';

    var field_input_output;
    if (_.has(args, "rows") && args.rows > 1) {
        field_input_output = [];
        for (var i = 0; i < args.rows; i++) {
            var input_output = (_.has(args, "output") && args.output)
                ? `<output name='${id}[${i}]' id='${id}-${i}'>&nbsp;</output>`
                : `<input name='${id}}[${i}]' id='${id}-${i}'>`;
            field_input_output.push(input_output);
        }
        field_input_output = field_input_output.join("\n");
    } else {
        field_input_output = (_.has(args, "output") && args.output)
            ? `<output name='${id}' id='${id}'>&nbsp;</output>`
            : `<input name='${id}' id='${id}'>`;
    }

    var field_overlay = _.has(args, "overlay") ? `<span class='overlay'>${args.overlay}</span>` : '';
    var field_underlay = _.has(args, "underlay") ? `<span class='underlay'>${args.underlay}</label>` : '';

    return `<fieldset class='${field_class}' id='field-${id}'>
    ${icon}
    ${field_legend}
    ${field_label}
    ${field_input_output}
    ${field_overlay}
    ${field_underlay}
</fieldset>`;
}


global.render_label = function (label) {
    label = label.replace(/\n/g, '<br>');
    return `<label>${label}</label>`
}


global.render_calc = function (args, items = null) {
    if (_.isArray(args) && _.isNull(items)) {
        items = args;
        args = {};
    }

    var calc_class = "calc";
    if (_.has(args, "inline") && args.inline) calc_class += " calc--inline";

    return `<fieldset class='${calc_class}'>
${items.join("\n")}
</fieldset>`
}