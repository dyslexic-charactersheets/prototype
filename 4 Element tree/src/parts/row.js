register('row', {
    contents: [],
    layout: "left"
}, args => {
    args.labelHeight = getLabelHeight(args);
    var cls = elementClass('row', null, args, [ 'unlabelled' ], [ 'layout', 'labelHeight' ]);
    return `<div${cls}>${render(args.contents)}</div>`;
});