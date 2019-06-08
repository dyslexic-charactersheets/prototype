'use strict';

CharacterSheets.register('hr', {
    defaults: {
        swash: false,
    }, 
    render: args => {
        var cls = elementClass('hr', null, args, [ 'swash' ]);
        // var i = args.swash ? '<i></i>' : '';
        return `<hr${cls}>`;
    }
});

CharacterSheets.register('tail', {
    render: args => {
        args.tail = true;
        var cls = elementClass('hr', null, args, [ 'tail' ]);
        // var i = args.swash ? '<i></i>' : '';
        return `<hr${cls}>`;
    }
});
