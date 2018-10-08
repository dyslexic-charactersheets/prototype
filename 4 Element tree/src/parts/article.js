register('article', {
    title: '',
    contents: [],
}, args => {
    var id = elementId('section', args.id);
    var cls = elementClass('section', null, args, [ ]);

    var header = '';
    var dl = '';

    return `<article${id}${cls}>
${header}${dl}
<div class='g'>
${argscontents.join("\n")}
</div>
</article>`;
})