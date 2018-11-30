const _ = require('lodash');

/* Utility functions */

global.fieldIdent = function(fieldid = '', partid = '') {
    if (fieldid == '' || _.isNull(fieldid)) {
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

global.fieldRadioIdent = function(fieldid = '', value = '') {
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

/* Render a field */

register('field', {
    frame: 'normal',
    control: 'input',
    value: '',
    repeat: 1,
    label: false,
    legend: false,
    attack: false,
    width: "medium",
}, args => {
    args.labelHeight = getLabelHeight(args);

    var id = elementID('field', args.id);
    var cls = elementClass('field', null, args, [ "output", "icon", "bold", "unlined", "attack", "ref", "misc", "temp" ], [ "frame", "control", "align", "size", "width", "icon", "proficiency", "labelHeight", "digits", "shift" ]);

    // Callbacks
    var frameCallback = getFieldFrameCallback(args.frame, args);
    var controlCallback = getFieldControlCallback(args.control, args);

    var innerCallback = function(args) {
        var i = (_.has(args, "icon") && args.control != "icon") ? '<i></i>' : '';
        var u = (_.has(args, "underlay")) ? `<u>${args.underlay}</u>`: '';
        var inner = `<div class='field__inner'>${i}${controlCallback(args)}${u}</div>`;
        if (args.repeat > 1)
            inner = inner.repeat(args.repeat);
        return inner;
    };

    // combine the results
    return `<fieldset${id}${cls}>${frameCallback(args, innerCallback)}</fieldset>`;
});

