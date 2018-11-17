register('layout', {
    layout: 'single',
    contents: [],
}, args => {
    var cls = elementClass('layout', null, args, ['flex', 'narrow', 'collapse'], ['layout']);
    
    return `<div${cls}>${render(args.contents)}</div>`;
});