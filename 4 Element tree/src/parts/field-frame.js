/* Pick a frame */

global.getFieldFrameCallback = function(frame, args) {
    switch (frame) {
        case 'none': return fieldFrame_none;
        case 'left': return fieldFrame_normal;
        case 'right': return fieldFrame_right;
        default: return fieldFrame_normal;
    }
}

/* Frame callbacks */

function fieldFrame_normal(args, callback) {
    var ident = fieldIdent(args.id);
    var label = args.label ? `<label${ident.for}>${esc(args.label, true)}</label>` : '';
    var legend = args.legend ? `<legend>${esc(args.legend, true)}</legend>`: '';

    return `${legend}${label}${callback(args)}`;
}

function fieldFrame_right(args, callback) {
    var ident = fieldIdent(args.id);
    var label = args.label ? `<label${ident.for}>${esc(args.label, true)}</label>` : '';
    var legend = args.legend ? `<legend>${esc(args.legend, true)}</legend>`: '';

    return `${callback(args)}${legend}${label}`;
}

function fieldFrame_none(args, callback) {
    return callback(args);
}