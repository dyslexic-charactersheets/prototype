register('level', {
    level: 1,
    narrow: true,
    contents: [],
}, args => {
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
});


register('level-marker', {
    level: 1
}, args => {
    if (args.level == "") {
        return `<div class='level-marker'></div>`;
    }
    return `<div class='level-marker'><label>Level</label><div class='level-marker__level'>${args.level}</div></div>`;
});
