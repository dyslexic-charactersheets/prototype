register('label', 'label', {
    label: "",
}, args => {
    var cls = elementClass('label', null, args, [], [ "align" ]);
    return `<label${cls}>${esc(args.label, true)}</label>`;
})