register('layout', {
    layout: 'single',
    contents: [],
}, args => {
    var cls = elementClass('layout', null, args, ['narrow'], ['layout']);
    
    return `<div${cls}>${render(args.contents)}</div>`;
});