register('span', {
    content: '',
}, args => {
    var cls = elementClass('span');
    return `<p${cls}>${esc(args.content)}</p>`;
});