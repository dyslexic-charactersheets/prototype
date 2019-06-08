'use strict';

CharacterSheets.register('row', {
    key: 'layout', 
    defaults: {
        contents: [],
        layout: 'left',
        valign: 'bottom',
    },
    render: args => {
        args.lp = getLabelHeight(args);
        var cls = elementClass('row', null, args, [ 'unlabelled' ], { 'layout': 'left', 'valign': 'bottom', 'lp': 0 });
        return `<div${cls}><div class='row__inner'>${render(args.contents)}</div></div>`;
    }
});