const _ = require('lodash');

register('calc', {
    output: {},
    inline: false,
    inputs: [],
}, args => {
    args.labelHeight = getLabelHeight(args);

    var cls = elementClass('calc', null, args, [ "inline", "labelHeight" ]);

    // parts of the calculation
    var output = _.defaults(args.output, { "output": true });
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

    return `<fieldset${cls}>${render(parts)}</fieldset>`;
});