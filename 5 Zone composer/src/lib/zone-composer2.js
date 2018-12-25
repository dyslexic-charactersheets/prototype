const _ = require('lodash');

function addAtZone(zones, zone_id, element) {
    if (zone_id.charAt(0) != '@') {
        console.log("Not a zone ID:", zone_id);
        return;
    }
    // console.log("Adding to zone:", zone_id);
    if (!_.has(zones, zone_id))
        zones[zone_id] = [];
    zones[zone_id].push(element);
    // console.log("Zone", zone_id, "contents:", zones[zone_id]);
}

function flattenDocument(doc, zones) {
    function flatten(element) {
        if (_.has(element, "contents")) {
            element.contents = _.flatMap(element.contents, (subelement) => {
                if (subelement.type == "zone") {
                    // console.log("Completing zone:", subelement.zone);
                    var insert = _.cloneDeep(zones[subelement.zone]);
                    insert.forEach(ins => {
                        ins = _.defaults(ins, { level: 1 });
                    });
                    insert = insert.sort((a, b) => {
                        return a.level - b.level;
                    });
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
        addAt: (zone_id, element) => {addAtZone(zones, zone_id, element)},
        document: () => flattenDocument(doc, zones)
    };
}