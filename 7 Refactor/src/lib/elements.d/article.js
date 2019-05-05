const _ = require('lodash');

CharacterSheets.register('article', 'title', {
    title: '',
    header: [],
    contents: [],
    shade: false,
}, args => {
    var id = elementID('section', args.id);
    var cls = elementClass('section', null, args, [ 'shade' ]);

    var headerElements = args.header;
    if (_.isEmpty(args.header) && args.title != '') {
        headerElements = [ { type: 'h6', title: args.title } ];
    }
    var header = `<header>${render(headerElements)}</header>`
    var dl = '';

    return `<article${id}${cls}>
${header}${dl}
<div class='g'>${render(args.contents)}</div>
</article>`;
})