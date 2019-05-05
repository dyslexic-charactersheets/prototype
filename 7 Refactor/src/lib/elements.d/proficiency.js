CharacterSheets.register('proficiency', 'proficiency', {
    proficiency: "untrained",
    content: "",
}, args => {
    var icon = (args.proficiency == "untrained") ? "proficiency" : "proficiency-"+args.proficiency;
    return render([
        {
            type: "layout",
            layout: "level",
            contents: [
                {
                    type: "icon",
                    icon: icon
                },
                {
                    type: "p",
                    content: args.content
                }
            ]
        }
    ]);
});

CharacterSheets.register('action', 'action', {
    action: 1,
    contents: [],
}, args => {
    var icon = 'action';
    switch(args.action) {
        case 1: icon = 'action'; break;
        case 2: icon = 'action2'; break;
        case 3: icon = 'action3'; break;
        case 13: icon = 'action13'; break;
        case 'reaction': icon = 'reaction'; break;
        case 'free': icon = 'free-action'; break;
        case 'template': icon = 'action-template'; break;
    }

    return render([
        {
            type: "layout",
            layout: "level",
            contents: [
                {
                    type: "icon",
                    icon: icon
                },
                {
                    type: "g",
                    contents: args.contents
                }
            ]
        }
    ])
})