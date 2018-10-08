register('layout', {
    layout: 'single',
    contents: [],
}, args => {
    var cls = elementClass('layout', null, args, [], ['layout']);
    
    return `<div${cls}>${render(args.contents)}</div>`;
});