const _ = require('lodash');

function findZone(document, zone_id) {
    console.log("Find zone:", zone_id);
    function findIn(element) {
        console.log("Looking in element:", JSON.stringify(element));
        if (!_.isObject(element))
            return false;
        if (element.type == "zone" && element.zone == zone_id) {
            return element;
        }
        if (_.has(element, "contents") && _.isArray(element.contents)) {
            var found = false;
            element.contents.forEach(subelement => {
                var res = findIn(subelement);
                if (res) {
                    console.log("Found zone");
                    found = res;
                }
            });
            return found;
        }
    }
    return findIn(document);
}

function addAtZone(document, zone_id, element) {
    var zone = findZone(document, zone_id);
    if (zone) {
        console.log("Adding to zone:", zone);
        if (!_.has(zone, "contents"))
            zone.contents = [];
        zone.contents.push(element);
    }
}

function flattenDocument(document) {
    function flatten(element) {
        if (!_.isObject(element) || !_.has(element, "contents"))
            return;
        element.contents = _.flatMap(element.contents, (subelement) => {
            if (_.isObject(subelement) && subelement.type == "zone") {
                if (!_.has(subelement, "contents"))
                    return [];
                return subelement.contents;
            }
            return [ subelement ];
        });
        element.contents.forEach(subelement => {
            flatten(subelement);
        });
    }

    document = _.cloneDeep(document);
    flatten(document);
    return document;
}

module.exports = function (baseDocument) {
    var doc = _.cloneDeep(baseDocument);
    
    return {
        addAt: (zone_id, element) => addAtZone(doc, zone_id, element),
        document: () => flattenDocument(doc)
    };
};