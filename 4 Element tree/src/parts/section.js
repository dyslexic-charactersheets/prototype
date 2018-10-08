register('section', {
    title: '',
    fill: false,
    untitled: false,
    contents: [],
}, args => {
    var cls = elementClass('section', null, args, ['primary', 'fill', 'untitled']);

    var title = args.untitled ? '' : `<h3>${esc(args.title)}</h3>`;
    return `<section${cls}>${title}
<div class='g'>${render(args.contents)}</div>
</section>`;
});