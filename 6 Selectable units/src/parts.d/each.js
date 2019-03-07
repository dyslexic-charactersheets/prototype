const _ = require('lodash');

register('each', '', {
    template: '',
    index: 'i',
    rows: [],
    params: {},
    contents: [],
}, 
args => '', 
args => {
    var i = 0;
    // console.log("[each] items", args.contents);
    return _.map(args.contents, item => {
        i++;

        var values = _.cloneDeep(args.params);
        if (i < args.rows.length && _.isObject(args.rows[i]))
            values = _.defaults(values, args.rows[i]);
        
        values['item'] = item;
        values = _.defaults(values, item);
        values[args.index] = i;

        // console.log("[each] template", args.template);
        // console.log("[each] interpolating", values);
        var product = interpolate(args.template, values);
        // console.log("[each] product", values);
        return product;
    });
});