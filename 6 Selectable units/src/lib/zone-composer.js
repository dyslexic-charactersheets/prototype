const _ = require('lodash');

function addAtZone(zones, zone_id, elements) {
    if (zone_id.charAt(0) != '@') {
        console.log("Not a zone ID:", zone_id);
        return;
    }
    // console.log("Adding to zone:", zone_id);
    if (!_.has(zones, zone_id))
        zones[zone_id] = [];
    elements.forEach(element => {
        zones[zone_id].push(element);
    });
    // console.log("Zone", zone_id, "contents:", zones[zone_id]);
}

function defineTemplate(templates, template_id, defaults, elements) {
    console.log(`[compose] Defining template:`, template_id, defaults);
    templates[template_id] = {
        defaults: defaults,
        elements: elements
    };
}

function composeDocument(doc, zones, templates) {
    var registry = getRegistry();

    // replace an element with some others
    function replace(element) {
        console.log("[compose] transform", element);
        if (!_.has(element, "type"))
            return element;
        if (!_.has(registry, element.type))
            return element;

        var reg = registry[element.type];
        if (!reg.transform)
            return element;

        // first recurse so we have the ingredients
        ["contents", "placeholder"].forEach(item_key => {
            console.log("[compose] Checking for", item_key);
            if (_.has(element, item_key)) {
                console.log("[compose] Preparing element", item_key, element[item_key]);
                if (_.isArray(element[item_key]))
                    element[item_key] = element[item_key].map(compose);
                else
                    element[item_key] = compose(element[item_key]);
            }
        });

        // then apply this transformation
        var newelements = reg.transform(_.defaults(element, reg.defaults), { zones: zones, templates: templates });
        if (newelements === false)
            return element;

        newelements = _.map(newelements, replace);
        return newelements;
    }

    // arrange the children of an element
    function compose(element) {
        console.log("[compose] compose", element);
        if (_.has(element, "contents")) {
            console.log("[compose] contents");
            // Recurse ingredients first
            element.contents = element.contents.map(compose);

            // Transform contents
            // if (!_.isArray(element.contents))
            //     console.log("NOT AN ARRAY", element.contents);
            element.contents = _.flatMap(element.contents, subelement => {
                if (_.isNull(subelement))
                    return [];

                return replace(subelement);
            });



            /*
             - list
             - each (decorate)
             - slots
             - zone
            - sort
            - template
             - repeat
            */





/*
            element.contents = _.filter(element.contents, subelement => {
                return !_.isNull(subelement);
            });


            // template
            element.contents = _.flatMap(element.contents, subelement => {
                if (subelement.type == "template") {
                    console.log(`[zone] Template: ${subelement.template}`);
                    subelement = _.defaults(subelement, {
                        params: {}
                    });

                    if (_.has(templates, subelement.template)) {
                        var template = templates[subelement.template];
                        
                        var params = _.defaults(subelement.params, template.defaults);
                        console.log("[zone] Applying template params", params);
                        return interpolate(template.elements, params);
                    }

                    // Er, we don't have templates yet
                }
                return [ subelement ];
            });

            // repeat
            element.contents = _.flatMap(element.contents, subelement => {
                if (subelement.type == "repeat") {
                    // console.log(`[zone] Repeat ${subelement.repeat} times`);
                    var contents = [];
                    for (var i = 1; i <= subelement.repeat; i++) {
                        var vars = {};
                        if (_.has(subelement, "rows") && i <= subelement.rows.length) {
                            vars = subelement.rows[i - 1];
                        }
                        vars[subelement.index] = i;
                        var iter = interpolate(subelement.contents, vars);
                        contents = contents.concat(iter);
                    }
                    return contents;
                }
                return [ subelement ];
            });

            // zones
            element.contents = _.flatMap(element.contents, (subelement) => {
                if (subelement.type == "zone") {
                    var zone = _.defaults(subelement, {
                        max: false,
                        contents: false,
                        fill: false,
                        slots: false,
                        overfill: true
                    });

                    var existing = _.has(zone, "contents") && zone.contents ? zone.contents : [];
                    var insert = _.has(zones, zone.zone) ? zones[zone.zone] : [];
                    // console.log("[zone]", existing, "+", insert);
                    // TODO removals and replacements

                    // var contents = [];
                    // if (zone.slots) {
                    //     console.log("[zone] Allocating slots");
                    //     // TODO slots
                    // } else {
                    //     contents = existing.concat(insert);
                    // }

                    














                    // console.log("[zone] Zone:", zone.zone);
                    var insert = [];
                    if (zone.contents) {
                        // console.log("[zone] Existing contents:", zone.contents);
                        insert = zone.contents;
                    }
                    if (_.has(zones, zone.zone)) {
                        // console.log("[zone] Inserting contents.");
                        insert = insert.concat(_.cloneDeep(zones[zone.zone]));
                    }

                    if (zone.max && zone.fill && !_.isEmpty(zone.fill)) {
                        // console.log("[zone] Filling zone");
                        while (insert.length < zone.max) {
                            var fill = _.cloneDeep(zone.fill);
                            // console.log(" ... with", fill);
                            if (_.isArray(fill)) {
                                if (fill.length == 0)
                                    break;
                                insert = insert.concat(fill);
                            } else {
                                insert.push(fill);
                            }
                            // console.log(` ... fill: ${insert.length} / ${zone.max}`);
                        }
                    }

                    if (zone.max && !zone.overfill) {
                        // console.log("[zone] Limiting zone");
                        if (insert.length > zone.max)
                            insert = insert.slice(0, zone.max);
                    }
                    
                    // if (zone.zone != '@pages')
                    //     console.log("[zone] Final contents:", insert);
                    return insert;
                }

                return [ subelement ];
            });

            // sort contents
            if (_.has(element, "sort") && element.sort) {
                // console.log("[zone] Sorting");
                var contents = element.contents.map(subelement => _.defaults(subelement, { level: 1, order: 1 }));
                element.contents = contents.sort((a, b) => {
                    if (a.level != b.level)
                        return a.level - b.level;
                    if (a.order != b.order)
                        return a.order - b.order;
                    if (a.primary && !b.primary)
                        return -1;
                    if (b.primary && !a.primary)
                        return 1;
                    return 0;
                });
            }

            // fill to min capacity

            // cut to max capacity

            // Recurse
            element.contents = _.map(element.contents, compose);

            // split into columns
            if (element.type == "list" && _.has(element, "columns") && element.columns > 1) {
                // console.log(`[zone] Split into ${element.columns} columns`);
                // console.log(`[zone] Contents:`, element.contents);
                var cols = [];
                if (element.flowv) {
                    for (var i = 0; i < element.columns; i++) {
                        cols.push([]);
                    }
                    var i = 0;
                    element.contents.forEach(element => {
                        cols[i].push(element);
                        i++;
                        if (i >= cols.length) i = 0;
                    });
                } else {
                    var split = Math.ceil((element.contents.length + 0.0) / (element.columns + 0.0));
                    // console.log(`[zone] Split every ${element.contents.length} / ${element.columns} = ${split} items`);

                    for (var i = 0; i < element.columns; i++) {
                        var contents = element.contents.slice(i * split, (i + 1) * split);
                        cols.push(contents);
                    }
                }

                return {
                    type: "layout",
                    layout: element.columns+"e",
                    contents: cols.map(col => {
                        return _.defaults({
                            columns: 1,
                            contents: col
                        }, element);
                    })
                }
            }
            */
        }
        return element;
    }
    
    return compose(doc);
}

module.exports = function(baseDocument) {
    var doc = _.cloneDeep(baseDocument);
    var zones = {};
    var templates = {};
    
    return {
        addAt: (zone_id, elements) => {addAtZone(zones, zone_id, elements)},
        defineTemplate: (template_id, defaults, elements) => {defineTemplate(templates, template_id, defaults, elements)},
        document: () => composeDocument(doc, zones, templates)
    };
}