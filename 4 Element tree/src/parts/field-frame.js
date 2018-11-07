/* Pick a frame */

global.getFieldFrameCallback = function(frame, args) {
    switch (frame) {
        case 'none': return fieldFrame_none;
        default: return fieldFrame_normal;
    }
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