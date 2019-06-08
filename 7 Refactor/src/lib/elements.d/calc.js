'use strict';

CharacterSheets.register('calc', {
    key: 'output',
    defaults: {
        output: {},
        layout: 'left',
        inline: false,
        inputs: [],
    }, 
    render: args => {
        args.labelHeight = getLabelHeight(args);

        args.calc = true;
        var cls = elementClass('row', null, args, [ "calc", "inline", "labelHeight" ], { 'layout': 'center' });

        // parts of the calculation
        var output = _.defaults(args.output, { "border": "full" });
        // console.log("Output:", output);
        var parts = [
            output,
            {
                "type": "span",
                "content": "="
            }
        ].concat(_.map(args.inputs, part => {
            if (_.isString(part)) 
                return {
                    "type": "span",
                    "content": part
                };
            return part;
        }));
        // console.log("Calculation contents", parts);

        // contextual args
        if (args.inline)
            args.field_frame = "inline";

        return `<div${cls}><div class='row__inner'>${render(parts)}<div class='spacer'></div></div></div>`;
    }
});
