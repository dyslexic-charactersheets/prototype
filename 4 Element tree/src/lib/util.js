const _ = require('lodash');
const color = require('color');


global.esc = function(content, newlines = false) {
    content = _.escape(content);
    content = content.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;');
    content = content.replace(/—/g, '&mdash;');
    content = content.replace(/&amp;(.+);/, '&$1;');

    if (newlines) {
        content = content.replace(/[\n\r]+/g, '<br>');
    }
    return content;
}

global.elementID = function(element, id = null) {
    if (_.isNull(id) || id == '' || id == 'null') {
        return '';
    }

    return ` id='${element}-${id}'`;
}

function pickMods(args, keys) {
    return _.flatMap(args, (v, k) => {
        return (v && keys.includes(k)) ? [ k ] : [];
    });
}

function pickAttribs(args, keys) {
    return _.pick(args, keys);
};

global.elementClass = function(block, element = null, args = {}, modKeys = [], attribKeys = {}) {
    var cls = [];

    var prefix = block;
    if (!_.isNull(element)) {
        prefix = `${block}__${element}`;
    }
    // console.log("["+block+" class] Prefix:", prefix);

    // built-in elements don't need to repeat that in their class
    switch (prefix) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'hr':
        case 'section':
        case 'aside':
        case 'article':
        case 'header':
        case 'footer':
        case 'img':
        case 'table':
        case 'p':
        case 'span':
        case 'b':
        case 'i':
            break;
        default:
            cls.push(prefix);
    }

    // mods are single-word adjectives, eg
    mods = pickMods(args, modKeys);
    // console.log("["+block+" class] Mods:", mods);
    _.each(mods, function (mod) {
        switch (mod) {
            // global mods that don't need a prefix
            // case 'align':
            //     cls.push(``)
            //     break;
            default:
                cls.push(`${prefix}--${mod}`);
        }
    });

    // attribs are key-values, eg align=left
    attribs = pickAttribs(args, attribKeys);
    // console.log("["+block+" class] Attribs:", attribs);
    _(attribs).toPairs().each(pair => {
        var key = pair[0];
        var value = pair[1];
        // console.log("  -", key, " = ", value);
        // some default values can be skipped
        switch (key) {
            case 'frame': if (value == 'normal') return;
            case 'control': if (value == 'input') return;
        }

        switch (key) {
            // global attributes that don't need a prefix
            case 'align':
                cls.push(`${key}_${value}`);
                break;
            default:
                cls.push(`${prefix}--${key}_${value}`);
                break;
        }
    });


    // _.forOwn(attribs, function(value, key) {
    //     // some default values can be skipped
    //     switch (key) {
    //         case 'frame': if (value == 'normal') return;
    //         case 'control': if (value == 'input') return;
    //         case 'align': if (value == 'left') return;
    //     }

    //     switch (key) {
    //         // global attributes that don't need a prefix
    //         case 'align':
    //             cls.push(`${key}_${value}`);
    //             break;
    //         default:
    //             cls.push(`${prefix}--${key}_${value}`);
    //             break;
    //     }
    // });

    // the class attr, if needed
    if (_.isEmpty(cls)) {
        return '';
    }
    return ` class='${cls.join(" ")}'`;
};

global.interpolate = function (template, values) {
    // console.log("Interpolate:", template);
    // console.log(" - Values:", values);

    if (_.isNull(template))
        return null;

    if (_.isString(template)) {
        return template.replace(/#\{(.*?)\}/g, function (tag) {
            var match = tag.match(/#\{(.*?)\}/);
            var index = match[1];
            // console.log("Match index:", index);
            if (_.has(values, index)) {
                // console.log(` - Replacing #{${index}} -> ${values[index]}`);
                return values[index];
            }
            return match;
        });
    }

    if (_.isArray(template)) {
        return template.map(item => interpolate(item, values));
    }

    if (_.isPlainObject(template)) {
        var pairs = _.toPairs(template);
        // console.log(" - value pairs", pairs);
        pairs = pairs.map(pair => [pair[0], interpolate(pair[1], values)]);
        // console.log(" - processed pairs", pairs);
        return _.fromPairs(pairs);
    }

    return template;
};


global.replaceColours = function (str) {
    str = str.replace(/#[0-9a-zA-Z]{6}/g, c => adjustColour(c));
    return str;
}

global.adjustColour = function (c) {
    try {
        var base = color(c);
        var col = color(documentColour);

        const lmin = 16;
        var lightness = base.lightness();
        if (lightness < lmin) lightness = lmin;
        col = col.lightness(lightness);
        
        // console.log("Color:", col.hex());
        // console.log(" - lightness:", lightness);

        // reduce the saturation of mid-lightness colours so they don't look too odd
        // enhance the saturation of dark colours so they don't fade away
        const nd = 24;
        const nmid = 50;
        const nlow = nmid - nd;
        const nhigh = nmid + nd;
        const f = 1.3;

        var saturation = col.saturationl();
        // console.log(" - saturation:", saturation);
        saturation = saturation + 10;
        if (lightness > nlow && lightness <= nmid) {
            diff = lightness - nlow;
            saturation -= diff * f;
        } else if (lightness > nmid && lightness < nhigh) {
            diff = nhigh - lightness;
            saturation -= diff * f;
        }
        if (saturation < 0) saturation = 0;
        if (saturation > 100) saturation = 100;
        // console.log(" - adjust:", saturation);
        col = col.saturationl(saturation);

        var result = col.hex();
        // console.log(" - adjusted:", result);
        return result;
    } catch (x) {
        // console.log(x);
        return c;
    }
}
