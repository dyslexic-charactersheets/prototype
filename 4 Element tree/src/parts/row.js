register('row', {
    contents: [],
    layout: "left"
}, args => {
    var cls = elementClass('row', null, args, [ 'unlabelled' ], [ 'layout' ]);
    return `<div${cls}>${render(args.contents)}</div>`;
});