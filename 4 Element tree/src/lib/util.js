const _ = require('lodash');


global.esc = function(content) {
    content = _.escape(content);
    content = content.replace(/’/g, '&rsquo;').replace(/‘/g, '&lsquo;');
    content = content.replace(/—/g, '&mdash;');
    content = content.replace(/&amp;(.+);/, '&$1;');
    return content;
}

global.elementID = function(element, id = null) {
    if (_.isNull(id) || id == '') {
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
    // console.log("[class] Prefix:", prefix);

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
    // console.log("[class] Mods:", mods);
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
    // console.log("[class] Attribs:", attribs);
    _.forOwn(attribs, function(value, key) {
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

    // the class attr, if needed
    if (_.isEmpty(cls)) {
        return '';
    }
    return ` class='${cls.join(" ")}'`;
};