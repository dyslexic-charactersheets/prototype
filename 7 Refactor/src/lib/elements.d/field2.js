'use strict';

CharacterSheets.register('field', {
    key: 'id', 
    defaults: {
        frame: 'above',
        control: 'input',
        repeat: 1,
        editable: true,
        // attack: false,
        // icon: false,
        'merge-bottom': false,
        label: false,
    },
    expect: [ 'icon' ],
    render: args => {
        args = fieldDefaults(args);

        var id = elementID('field', args.id);
        var cls = elementClass('field', null, args, 
            [ "icon", "ref", "misc", "temp" ],
            { "frame": "normal", "width": "medium", "align": "centre", "size": "medium", "control": "input", "shift": 0, "lp": 0 });
            // [ "output", "icon", "bold", "unlined", "attack", "ref", "misc", "temp", "merge-bottom" ], 
            // [ "frame", "control", "align", "size", "width", "icon", "proficiency", "labelHeight", "digits", "shift" ]);

        var frameArgs = _.defaults({ type: 'frame:'+args.frame }, args);
        var frame = renderItem(frameArgs);
        return `<div${id}${cls}>${frame}</div>`;
    }
});


// field defaults are a combination of the defaults from the field's frame and control
global.fieldDefaults = function(args) {
    // if (args.id == 'perception') log("field", "Field args", args);

    args = _.defaults(args, {
        frame: 'above',
        control: 'input'
    });
    if (!_.has(CharacterSheets._registry, 'frame:'+args.frame)) {
        error('field', 'Field frame not registered:', args.frame);
        args.frame = 'above';
    }
    if (!_.has(CharacterSheets._registry, 'control:'+args.control)) {
        error('field', 'Field control not registered:', args.control);
        args.control = 'input';
    }

    var frame = CharacterSheets._registry['frame:'+args.frame];
    var control = CharacterSheets._registry['control:'+args.control];

    // if (_.has(frame.defaults.frame)) delete args.frame;
    // if (_.has(control.defaults.control)) delete args.control;
    args = _.defaults(args, frame.defaults, control.defaults, {
        border: (args.output ? 'full' : 'bottom'),
        align: (args.width == "stretch" ? "left" : "centre"),
        width: "medium",
        icon: false,
    });

    args.lp = getLabelHeight(args);
    // if (args.id == 'perception') log("field", "Field merged args", args);
    return args;
};

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
};

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
};

global.fieldInner = function(args) {
    args = _.defaults({ type: 'control:'+args.control }, args);
    var control = renderItem(args);
    var icon = (_.has(args, "icon") && !!args.icon && _.isString(args.icon) && args.control != "icon") ? `<i class='icon icon_${args.icon}'></i>` : '';
    var unit = (_.has(args, "unit") && !!args.unit) ? `<label class='field__unit'>${args.unit}</label>` : '';

    // var boxcls = elementClass('field', 'box', args, [ "icon" ], { "border": "bottom" });
    // var icon = (_.has(args, "icon") && !!args.icon && args.control != "icon") ? `<i class='icon icon_${args.icon}'></i>` : '';
    // var unit = (_.has(args, "unit") && !!args.unit) ? `<label class='field__unit'>${args.unit}</label>` : '';
    // var inner = `<div${boxcls}>${icon}${control}${unit}</div>`;

    var boxargs = _.pick(args, [ 'icon', 'border' ]);
    var inner;
    if (args.repeat > 1) {
        var boxes = [];
        for (var i = 1; i <= args.repeat; i++) {
            if (i == args.repeat && args['merge-bottom'])
                boxargs['border'] = 'none';
            var boxcls = elementClass('field', 'box', boxargs, [ "icon" ], { "border": "bottom" });
            var box = `<div${boxcls}>${icon}${control}${unit}</div>`;
            boxes.push(box);
        }
        inner = boxes.join("");
    } else {
        if (args['merge-bottom'])
            boxargs['border'] = 'none';
        var boxcls = elementClass('field', 'box', boxargs, [ "icon" ], { "border": "bottom" });
        inner = `<div${boxcls}>${icon}${control}${unit}</div>`;
    }
    var framecls = elementClass('field', 'frame', args, [ "merge-bottom" ], { });
    return `<div${framecls}>${inner}</div>`;
};
