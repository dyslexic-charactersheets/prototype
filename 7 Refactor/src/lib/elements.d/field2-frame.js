'use strict';

var defaultFrameRender = args => {
    var ident = args.control == 'radio' ? fieldRadioIdent(args.id, args.value) : fieldIdent(args.id);
    var label = args.label ? `<label${ident.for}>${esc(args.label, true)}</label>` : '';
    var legend = args.legend ? `<legend>${esc(args.legend, true)}</legend>`: '';

    return `${legend}${label}${fieldInner(args)}`;
};

CharacterSheets.registerFieldFrame = function (element, props) {
    props = _.defaults(props, {
        defaults: {},
        render: args => ''
    });
    CharacterSheets.register('frame:'+element, props, false);
};

// Register the faux-elements

CharacterSheets.registerFieldFrame('above', {
    defaults: {
        label: false,
        legend: false,
    }, 
    render: defaultFrameRender,
});

CharacterSheets.registerFieldFrame('left', {
    defaults: {
        label: false,
        legend: false,
    }, 
    render: defaultFrameRender
});

CharacterSheets.registerFieldFrame('right', {
    defaults: {
        label: false,
        legend: false,
    },
    render: args => {
        var ident = 'radio' ? fieldRadioIdent(args.id, args.value) : fieldIdent(args.id);
        var label = args.label ? `<label${ident.for}>${esc(args.label, true)}</label>` : '';
        var legend = args.legend ? `<legend>${esc(args.legend, true)}</legend>`: '';

        return `${fieldInner(args)}${legend}${label}`;
    }
});

CharacterSheets.registerFieldFrame('h-label', {
    defaults: {
        label: false,
    }, 
    render: args => {
        var ident = fieldIdent(args.id);
        var label = args.label ? `<label class='field__h-label'${ident.for}>${esc(args.label, true)}</label>` : '';
        // WRONG! The h-label is supposed to go inside the box!
        return `${label}${fieldInner(args)}`;
    }
});

CharacterSheets.registerFieldFrame('none', {
    render: args => {
        return fieldInner(args);
    }
});

