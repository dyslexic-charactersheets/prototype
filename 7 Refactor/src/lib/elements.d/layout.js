'use strict';

CharacterSheets.register('layout', {
    key: 'layout', 
    defaults: {
        layout: 'single',
        columns: 0,
        gutter: 'medium',
        contents: [],
    }, 
    render: args => {
        var cls = elementClass('layout', null, args, ['flex', 'no-flex', ], { 'layout': '', 'gutter': '' });

        // pick a column number
        var columns = args.columns;
        if (columns == 0) {
            switch (args.layout) {
                case '1n':
                    columns = 1;
                    break;

                case '2e':
                case '2l':
                case '2r':
                case 'alignment':
                    columns = 2;
                    break;

                case '3e':
                    columns = 3;
                    break;

                case '5e':
                    columns = 5;
                    break;
            }
        }

        // chunk the contents
        var parts = [];
        if (columns == 0) {
            parts.push(args.contents);
        } else {
            parts = _.chunk(args.contents, columns);
        }

        return parts.map(contents => `<div${cls}>${render(contents)}</div>`).join("");
    }
});
