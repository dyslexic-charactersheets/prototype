register('row', 'layout', {
    contents: [],
    layout: "left"
}, args => {
    args.labelHeight = getLabelHeight(args);
    var cls = elementClass('row', null, args, [ 'unlabelled' ], [ 'layout', 'labelHeight' ]);
    return `<div${cls}><div class='row__inner'>${render(args.contents)}</div></div>`;
});