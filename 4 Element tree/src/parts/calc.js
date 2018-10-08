const _ = require('lodash');

register('calc', {
    product: {},
    inline: false,
    parts: [],
}, args => {
    var cls = elementClass('calc', null, args, [ "inline" ]);

    // parts of the calculation
    var contents = [
        args.product,
        {
            "type": "span",
            "content": "="
        }
    ].concat(_.map(args.parts, part => {
        if (_.isString(part)) 
            return {
                "type": "span",
                "content": part
            };
        return part;
    }));
    // console.log("Calculation contents", contents);

    // contextual args
    if (args.inline)
        args.field_frame = "inline";

    return `<fieldset${cls}>${render(contents, args)}</fieldset>`;
});