import * as _ from 'lodash';

import { interpolate } from '../util';

export let each = {
    name: 'each',
    key: '', 
    defaults: {
        template: '',
        index: 'i',
        rows: [],
        params: {},
        contents: [],
    }, 
    transform: args => {
        var i = 0;
        // log("each", "Items", args.contents);
        return args.contents.flatMap(item => {
            i++;

            var values = _.cloneDeep(args.params);
            if (i < args.rows.length && _.isObject(args.rows[i]))
                // values = _.defaults(values, args.rows[i]);
                values = Object.assign(args.rows[i], values);

            values['item'] = item;
            values = Object.assign({}, item, values);
            // values = _.defaults(values, item);
            values[args.index] = i;

            // log("each", "Template", args.template);
            // log("each", "Interpolating", values);
            var product = interpolate(args.template, values);
            // log("each", "Product", values);
            return product;
        });
    }
}