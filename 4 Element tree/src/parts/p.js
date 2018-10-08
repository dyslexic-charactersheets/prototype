register('p', {
    prose: false,
    content: '',
    align: '',
}, args => {
    var cls = elementClass('p', null, args, ['prose'], ['align']);
    
    return `<p${cls}>${esc(args.content)}</p>`;
});