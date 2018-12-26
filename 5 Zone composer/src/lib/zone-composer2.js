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

function flattenDocument(doc, zones) {
    function flatten(element) {
        if (_.has(element, "contents")) {
            element.contents = _.flatMap(element.contents, (subelement) => {
                if (subelement.type == "zone") {
                    subelement = _.defaults(subelement, {
                        max: false,
                        placeholder: false,
                        overfill: true
                    })
                    // console.log("Completing zone:", subelement.zone);
                    var insert = _.cloneDeep(zones[subelement.zone]);
                    insert.forEach(ins => {
                        ins = _.defaults(ins, { level: 1 });
                    });
                    insert = insert.sort((a, b) => {
                        return a.level - b.level;
                    });

                    if (subelement.max && subelement.placeholder) {
                        while (insert.length < subelement.max) {
                            insert.push(_.cloneDeep(subelement.placeholder));
                        }
                    }

                    if (subelement.max && !subelement.overfill) {
                        if (insert.length > subelement.max)
                            insert = insert.slice(0, subelement.max);
                    }
                    
                    return insert;
                }

                return [ subelement ];
            });
            element.contents.forEach(element => {
                flatten(element);
            });
        }
        return element;
    }
    return flatten(doc);
}

module.exports = function(baseDocument) {
    var doc = _.cloneDeep(baseDocument);
    var zones = {};
    
    return {
        addAt: (zone_id, elements) => {addAtZone(zones, zone_id, elements)},
        document: () => flattenDocument(doc, zones)
    };
}