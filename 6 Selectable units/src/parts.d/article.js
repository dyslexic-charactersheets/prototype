register('article', 'title', {
    title: '',
    header: [],
    contents: [],
    shade: false,
}, args => {
    var id = elementID('section', args.id);
    var cls = elementClass('section', null, args, [ 'shade' ]);

    var header = `<header>${render(args.header)}</header>`
    var dl = '';

    return `<article${id}${cls}>
${header}${dl}
<div class='g'>${render(args.contents)}</div>
</article>`;
})