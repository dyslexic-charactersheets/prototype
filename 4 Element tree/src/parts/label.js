register('label', {
    label: "",
}, args => {
    var cls = elementClass('label');
    return `<label${cls}>${esc(args.label)}</label>`;
})