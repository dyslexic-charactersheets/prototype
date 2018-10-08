/* Frame callbacks */

function field_frame_normal(args, controlCallback) {
    var label = args.label ? `<label>${esc(args.label)}</label>` : '';
    var legend = args.legend ? `<legend>${esc(args.legend)}</legend>`: '';

    return `${legend}${label}${controlCallback(args)}`;
}

function field_frame_none(args, controlCallback) {
    return controlCallback(args);
}

/* Control callbacks */

function field_control_input(args) {
    return '<input>';
}

function field_control_radio(args) {
    return `<input type='radio'>`;
}

function field_control_checkbox(args) {
    return `<input type='checkbox'>`;
}

function field_control_alignment(args) {
    return `...`;
}

register('field', {
    frame: 'normal',
    control: 'input',
    label: false,
    legend: false,
    width: "medium",
}, args => {
    var cls = elementClass('field', null, args, [], [ "frame" ]);

    // Frame
    var frameCallback = field_frame_normal;
    switch (args.frame) {
        case 'none': frameCallback = field_frame_none; break;
    }

    // Control
    var controlCallback = field_control_input;
    switch (args.control) {
        case 'radio': controlCallback = field_control_radio; break;
        case 'checkbox': controlCallback = field_control_checkbox; break;
        case 'alignment': controlCallback = field_control_alignment; break;
    }

    // combine the results
    return `<fieldset${cls}>${frameCallback(args, controlCallback)}</fieldset>`;
})