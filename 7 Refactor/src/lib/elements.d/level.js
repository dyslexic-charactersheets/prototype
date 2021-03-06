'use strict';

CharacterSheets.register('level', {
    key: 'level', 
    defaults: {
        level: 1,
        narrow: true,
        contents: [],
    },
    render: args => {
        return render([
            {
                type: "layout",
                layout: "level",
                contents: [
                    {
                        type: "g",
                        contents: [
                            {
                                type: "level-marker",
                                level: args.level
                            }
                        ]
                    },
                    {
                        type: "g",
                        contents: args.contents
                    }
                ]
            }
        ]);
    }
});


CharacterSheets.register('level-marker', {
    key: 'level', 
    defaults: {
        level: 1,
        marker: "Level",
    },
    render: args => {
        var level = (""+args.level).replace(/^\s*/, '').replace(/\s*$/, '');
        if (level == "") {
            return `<div class='level-marker'></div>`;
        }
        var marker = args.marker ? `<label>${args.marker}</label>` : '';
        return `<div class='level-marker'>${marker}<div class='level-marker__level'>${level}</div></div>`;
    }
});
