CharacterSheets.register('repeat', 'repeat', {
    repeat: 1,
    index: "i",
    rows: []
}, args => '', args => {
    var contents = [];

    for (var i = 1; i <= args.repeat; i++) {
        var vars = {};
        if (i <= args.rows.length) {
            vars = args.rows[i - 1];
        }
        vars[args.index] = i;
        var items = interpolate(args.contents, vars);
        contents = contents.concat(items);
    }

    return contents;
});

/*
    {
    var iters = [];
    for (var i = 1; i <= args.repeat; i++) {
        var vars = {};
        if (i <= args.rows.length) {
            vars = args.rows[i - 1];
        }
        vars[args.index] = i;
        var contents = interpolate(args.contents, vars);
        
        var inner = render(contents);
        iters.push(`<div class='repeat__iter'>${inner}</div>`);
    }

    // console.log("Iters:", iters);

    var cls = elementClass('repeat', null, args, [ "zebra", "collapse" ], []);
    return `<div${cls}>${iters.join("")}</div>`;
})
*/