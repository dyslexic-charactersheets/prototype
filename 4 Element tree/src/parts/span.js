register('span', {
    content: '',
}, args => {
    var cls = elementClass('span');
    return `<span${cls}>${esc(args.content, true)}</span>`;
});