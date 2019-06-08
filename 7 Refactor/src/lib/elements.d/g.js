'use strict';

CharacterSheets.register('g', {
    key: '', 
    defaults: {
        contents: [],
        valign: 'center',
    }, 
    render: args => {
        var cls = elementClass('g', null, args, [], { 'valign': 'center' });
        return `<div${cls}>${render(args.contents)}</div>`;
    }
});