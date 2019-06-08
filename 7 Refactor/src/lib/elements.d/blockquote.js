'use strict';

CharacterSheets.register('blockquote', {
    render: args => `<blockquote>${render(args.contents)}</blockquote>`
});
