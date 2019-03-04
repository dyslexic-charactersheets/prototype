const _ = require('lodash');

register('each', '', {
    template: '',
    rows: [],
    params: {},
    contents: [],
}, 
args => '', 
args => {
    var i = 0;
    return _.each(args.contents, item => {
        var values = _.cloneDeep(args.params);
        if (i < args.rows.length && _.isObject(args.rows[i]))
            values = _.defaults(values, args.rows[i]);
        
        values['item'] = item;
        values = _.defaults(values, item);
        console.log("[each] interpolating template", args.template);
        console.log("[each] interpolating", values);
        return interpolate(args.template, values);
    });
});