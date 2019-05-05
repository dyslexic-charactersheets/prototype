'use strict';

function addAtZone(zones, zone_id, elements) {
    if (zone_id.charAt(0) != '@') {
        err("compose", "Not a zone ID:", zone_id);
        return;
    }
    log("compose", "Adding to zone:", zone_id);
    if (!_.has(zones, zone_id))
        zones[zone_id] = [];
    elements.forEach(element => {
        zones[zone_id].push(element);
    });
    // log("compose", "Zone", zone_id, "contents:", zones[zone_id]);
}

function defineTemplate(templates, template_id, defaults, elements) {
    log("compose", "Defining template:", template_id, defaults);
    templates[template_id] = {
        defaults: defaults,
        elements: elements
    };
}

function composeDocument(doc, zones, templates) {
    var registry = CharacterSheets._registry;

    function compose(element) {
        // console.log("[compose] element", element);

        if (!_.has(element, "type"))
            return [ element ];

        // first recurse so we have the ingredients
        _.each(["contents", "placeholder"], item_key => {
            // console.log("[compose] Checking for", item_key);
            if (_.has(element, item_key)) {
                // console.log("[compose] Preparing element", item_key, element[item_key]);
                if (_.isArray(element[item_key]))
                    element[item_key] = _.flatMap(element[item_key], compose);
                else
                    element[item_key] = compose(element[item_key]);
            }
        });

        // transform the element
        if (_.has(registry, element.type)) {
            var reg = registry[element.type];
            
            if (reg.transform) {
                var newelements = reg.transform(_.defaults(element, reg.defaults), { zones: zones, templates: templates });
                if (newelements === false)
                    return element;

                newelements = _.flatMap(newelements, compose);
                return newelements;
            }
        }

        return [ element ];
    }
    
    var c = compose(doc);
    return c[0];
}

CharacterSheets.zoneCompose = function(baseDocument) {
    var doc = _.cloneDeep(baseDocument);
    log("compose", "Base document", doc);
    var zones = {};
    var templates = {};
    
    return {
        addAt: (zone_id, elements) => {addAtZone(zones, zone_id, elements)},
        defineTemplate: (template_id, defaults, elements) => {defineTemplate(templates, template_id, defaults, elements)},
        document: () => composeDocument(doc, zones, templates)
    };
}