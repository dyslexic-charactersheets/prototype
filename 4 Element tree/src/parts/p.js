register('p', {
    prose: false,
    content: '',
    align: 'left',
}, args => {
    var cls = elementClass('p', null, args, ['prose'], ['align', 'size']);
    
    // var paras = args.content.split(/[\n\r]/);

    return `<p${cls}>${esc(args.content)}</p>`;
});