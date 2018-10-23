register('p', {
    prose: false,
    content: '',
    align: '',
}, args => {
    var cls = elementClass('p', null, args, ['prose'], ['align']);
    
    // var paras = args.content.split(/[\n\r]/);

    return `<p${cls}>${esc(args.content)}</p>`;
});