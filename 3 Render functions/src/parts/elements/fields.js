const _ = require('lodash');

function subfield_ident(id, subid) {
    if (_.isNull(id)) {
        return { id: '', name: '', for: '', ident: '' };
    }

    var eid = id+"--"+subid;
    var name = id+'['+name+']';
    var ident = `id='${eid}' name='${name}'`;
    var forid = `for='${id}'`;
    return { id: eid, name: name, for: forid, ident: ident };
}

function field_ident(id) {
    if (_.isNull(id)) {
        return { id: '', name: '', for: '', ident: '' };
    }

    var ident = `id='${id}' name='${id}'`;
    var forid = `for='${id}'`;
    return { id: id, name: id, for: forid, ident: ident };
}

function field_radio_ident(name, value) {
    if (_.isNull(name)) {
        return { id: '', name: '', for: '', ident: '' };
    }

    if (_.isNull(value) || value == '') {
        return field_ident(name);
    }

    var id = name+'--'+value;
    var ident = `id='${id}' name='${name}'`;
    var forid = `for='${id}'`;
    return { id: id, name: name, for: forid, ident: ident };
}

function render_alignment_field(id, args) {
    var ident = field_ident(id);

    return `<fieldset class='field--alignment' id='field-${ident.id}'>
    <i class='field--alignment__grid'></i>
    <i class='field--alignment__good-icon'></i>
    <i class='field--alignment__evil-icon'></i>
    <i class='field--alignment__lawful-icon'></i>
    <i class='field--alignment__chaotic-icon'></i>

    <label class='field--alignment__good'>Good</label>
    <label class='field--alignment__evil'>Evil</label>
    <label class='field--alignment__lawful'>Lawful</label>
    <label class='field--alignment__chaotic'>Chaotic</label>
</fieldset>`;
}

function render_radio_field(id, args) {

    var value = null;
    if (_.has(args, "value")) {
        value = args.value;
        ident = field_ident
    }

    var ident = field_radio_ident(id, value);
    var field_class = 'field field--radio';
    
    var legend = _.has(args, "legend") ? `<legend>${args.legend}</legend>` : '';
    var label = _.has(args, "label") ? `<label ${ident.for}>${args.label}</label>` : '';

    return `<fieldset class='${field_class}'>
${legend}
<div class='field__inner'><div class='field__item'>
<input type='radio' ${ident.ident}><label ${ident.for}></label>
</div></div>
${label}
</fieldset>`;
}

function render_checkbox_field(id, args) {
    var ident = field_ident(id);
    var field_class = "field field--checkbox";

    ["unlabelled", "horizontal"].forEach(adj => {
        if (_.has(args, adj) && args[adj]) field_class += " field--"+adj;
    });

    var legend = _.has(args, "legend") ? `<legend>${args.legend}</legend>` : '';
    var label = _.has(args, "label") ? `<label ${ident.for}>${args.label}</label>` : '';

    return `<fieldset class='${field_class}'>
${legend}
<div class='field__inner'><div class='field__item'>
<input type='checkbox' ${ident.ident}><label ${ident.for}></label>
</div></div>
${label}
</fieldset>`;
}



function render_proficiency_field(id, args) {
    var ident = field_ident(id);
    var field_class = "field field--icon field--proficiency";

    if (_.has(args, "proficiency")) field_class += " field--proficiency--"+args.proficiency;

    var legend = _.has(args, "legend") ? `<legend>${args.legend}</legend>` : '';
    var label = _.has(args, "label") ? `<label ${ident.for}>${args.label}</label>` : '';
    if ((_.has(args, "box") && args.box) || (_.has(args, "output") && args.output)) field_class += " field--box";
    if (_.has(args, "width")) field_class += " field--width-"+(args.width == 2 ? 'large' : (args.width == 3 ? 'huge' : args.width));

    // var input_output = (_.has(args, "output") && args.output) ? `<output class='field--proficiency__bonus' ${ident.ident}>&nbsp;</output>` : `<input class='field--proficiency__bonus' ${ident.ident}>`;
    var input_output = `<input class='field--proficiency__bonus' ${ident.ident}>`;

    return `<fieldset class='${field_class}'>
    ${legend} ${label}
    <div class='field__inner'>
        <input type='checkbox' class='field--proficiency__trained'>
        <input type='checkbox' class='field--proficiency__expert'>
        <input type='checkbox' class='field--proficiency__master'>
        <input type='checkbox' class='field--proficiency__legendary'>
        <div class='field__item'>
            ${input_output}
        </div>
        <i></i>
    </div>
</fieldset>`
}

function render_speed_field(id, args) {
    var ident = field_ident(id);
    var field_class = "field field--speed";

    var legend = _.has(args, "legend") ? `<legend>${args.legend}</legend>` : '';
    var label = _.has(args, "label") ? `<label>${args.label}</label>` : '';

    return `<fieldset class='${field_class}'>
    ${legend} ${label}
    <div class='field__inner'>
        <div class='field__item'>
            <fieldset class='subfield subfield--ft'>
                <input>
                <span class='overlay'>ft</span>
            </fieldset>
        </div>
        <div class='field__item'>
            <fieldset class='subfield subfield--sq'>
                <input>
                <span class='overlay'>sq</span>
            </fieldset>
        </div>
    </div>
</fieldset>`
}

function render_check_grid_field(id, args) {
    var ident = field_ident(id);
    var field_class = "field field--checkgrid";

    var isVertical = _.has(args, "vertical") && args.vertical;
    var max = _.has(args, "max") ? args.max : 10;

    return `<fieldset class='${field_class}'>
...
</fieldset>`;
}

function render_damage_field(id, args) {
    _.defaults(args, { width: small });
    
    var parts = [
        { subid: 'dcount', overlay: "d" },
        { subid: 'die' }
    ];
    return render_composite_field(id, args, parts);
}

function render_field_boost(id, args) {
    var plus = '';
    if (!_.has(args, "plus") || args.plus) {
        var plusident = field_ident(id+"--plus");
        plus = `<div class='field__item field--checkbox__item--plus'><input type='checkbox' ${plusident.ident}><label ${plusident.for}></label></div>`
    }
    var minus = '';
    if (!_.has(args, "minus") || args.minus) {
        var minusident = field_ident(id+"--minus");
        minus = `<div class='field__item field--checkbox__item--minus'><input type='checkbox' ${minusident.ident}><label ${minusident.for}></label></div>`
    }

    // var plus = (_.has(args, "plus") && !args.plus) ? '' :  `<div class='field__item field--checkbox__item--plus'><input type='checkbox'><label></label></div>`;
    // var minus = (_.has(args, "minus") && !args.minus) ? '' : `<div class='field__item field--checkbox__item--minus'><input type='checkbox'><label></label>`;
    return `<fieldset class='field field--checkbox'><div class='field__inner'>
${plus}
${minus}
</div></fieldset>`;
}

function render_progression(id, args) {
    // var parts = _.map(args.parts, part => {
    //     var partArgs = _.defaults({}, part);
    //     _.defaults(partArgs, args);
    //     partArgs.unlabelled = true;
    //     return render_field(partArgs);
    // });

    var ident = field_ident(id);
    var field_class = "field field--progression";
    var separator = _.has(args, "separator") ? "\n"+render_span(args.separator)+"\n" : "\n";

    var legend = _.has(args, "legend") ? ((l) => { l = l.replace(/\n/g, '<br>'); return `<legend>${l}</legend>` })(args.legend) : '';
    var label = _.has(args, "label") ? ((l) => { l = l.replace(/\n/g, '<br>'); return `<label ${ident.for}>${l}</label>` })(args.label) : '';

    return `<fieldset class='${field_class}'>
${legend}${label}
${args.parts.join(separator)}
</fieldset>`
}

function render_composite_field(id, composite_args, parts) {
    var composite_ident = field_ident(id);
    var field_class = "field";
    if ( (_.has(composite_args, "box") && composite_args.box) || (_.has(composite_args, "output") && composite_args.output) ) field_class += " field--box";
    if (_.has(composite_args, "width")) field_class += " field--width-"+(composite_args.width == 2 ? 'large' : (composite_args.width == 3 ? 'huge' : composite_args.width));

    parts = _.map(parts, args => {
        // _.defaults(args, composite_args);
        var ident = field_ident(id, args.subid);
        // var input_output = (_.has(args, "output") && args.output) ? `<output ${ident.ident}>&nbsp;</output>` : `<input ${ident.ident}>`;
        var input_output = `<input ${ident.ident}>`;

        var overlay = _.has(args, "overlay") ? `<span class='overlay'>${args.overlay}</span>` : '';

        return `<div class='field__item'>${input_output}${overlay}</div>`;
    });

    var icon = '';
    if (_.has(composite_args, "icon")) { 
        field_class += " field--icon field--icon--"+composite_args.icon;
        icon = '<i></i>';
    }

    var field_legend = _.has(composite_args, "legend") ? ((l) => { l = l.replace(/\n/g, '<br>'); return `<legend>${l}</legend>` })(composite_args.legend) : '';
    var field_label = _.has(composite_args, "label") ? ((l) => { l = l.replace(/\n/g, '<br>'); return `<label ${composite_ident.for}>${l}</label>` })(composite_args.label) : '';

    return `<fieldset class='${field_class}'>
    ${field_legend}
    ${field_label}
<div class='field__inner'>
${icon}
${parts.join("\n")}
</div>
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
            case 'damage': return render_damage_field(id, args);
            case 'check_grid': return render_check_grid_field(id, args);
            case 'progression': return render_progression(id, args);
            case 'boost': return render_field_boost(id, args);
            // case 'composite': return render_composite_field(id, args);

            // default: return render_composite_field(id, args, [ args ]);
        }
    }

    var ident = field_ident(id);
    var field_class = "field";
    ["ref", "unlabelled", "temp", "wide", "mod", "horizontal", "progression"].forEach(adj => {
        if (_.has(args, adj) && args[adj]) field_class += " field--"+adj;
    });
    if ( (_.has(args, "box") && args.box) || (_.has(args, "output") && args.output) ) field_class += " field--box";

    if (_.has(args, "align")) field_class += " align-"+args.align;
    if (_.has(args, "width")) field_class += " field--width-"+(args.width == 2 ? 'large' : (args.width == 3 ? 'huge' : args.width));
    if (_.has(args, "h_label") && args.h_label) field_class += " field--h-label";
    if (_.has(args, "size")) field_class += " field--"+args.size;

    var icon = '';
    if (_.has(args, "icon")) { 
        field_class += " field--icon field--icon--"+args.icon;
        icon = '<i></i>';
    }

    var field_legend = _.has(args, "legend") ? ((l) => { l = l.replace(/\n/g, '<br>'); return `<legend>${l}</legend>` })(args.legend) : '';
    var field_label = _.has(args, "label") ? ((l) => { l = l.replace(/\n/g, '<br>'); return `<label ${ident.for}>${l}</label>` })(args.label) : '';

    var field_overlay = _.has(args, "overlay") ? `<span class='overlay'>${args.overlay}</span>` : '';
    var field_underlay = _.has(args, "underlay") ? `<span class='underlay'>${args.underlay}</label>` : '';

    var value = _.has(args, "value") ? args.value : '';
    var valueAttr = _.has(args, "value") ? `value='${args.value}'` : '';

    var field_items;
    if (_.has(args, "rows") && args.rows > 1) {
        field_class += " field--multiline align-left";
        var items = [];
        for (var i = 0; i < args.rows; i++) {
            var subident = subfield_ident(id, i);
            // var input_output = (_.has(args, "output") && args.output) ? `<output ${subident.ident}>${value}</output>` : `<input ${subident.ident} ${valueAttr}>`;
            var input_output = `<input ${subident.ident} ${valueAttr}>`;
            var item = field_item = `<div class='field__item'>${input_output}${field_overlay}${field_underlay}</div>`;
            items.push(item);
        }
        field_items = items.join("\n");
    } else {
        // var input_output = (_.has(args, "output") && args.output) ? `<output ${ident.ident}>${value}</output>` : `<input ${ident.ident} ${valueAttr}>`;
        var input_output = `<input ${ident.ident} ${valueAttr}>`;
        field_items = `<div class='field__item'>${input_output}${field_overlay}${field_underlay}</div>`;
    }

    return `<fieldset class='${field_class}'>
    ${field_legend}
    ${field_label}
    <div class='field__inner'>${icon}${field_items}</div>
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
    if (_.has(args, "lines")) calc_class += " calc--"+args.lines+"-lines";

    return `<fieldset class='${calc_class}'>
${items.join("\n")}
</fieldset>`
}