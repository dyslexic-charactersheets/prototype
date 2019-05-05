'use strict';

CharacterSheets.create = function (options) {
    var characterSheet = {
        documentColour: options.documentColour,
        accentColour: options.accentColour,
    };
    var units = options.units;
    units.push('document');
    characterSheet.units = CharacterSheets.getUnits(units);

    CharacterSheets._current = characterSheet;
    // log("create", "Getting units", options.units);
    // log("create", characterSheet.units);

    characterSheet.ready = function (callback) {
        callback();
    }

    characterSheet.document = function () {
        // log("create", "Combining units:", options.units);
        
        var documentUnit = CharacterSheets.getUnit("document");
        var document = CharacterSheets.zoneCompose(documentUnit.contents[0]);

        _.each(characterSheet.units, unit => {
            if (unit == null)
                return;
            // log("create", "Adding unit", unit.id);

            if (_.has(unit, "inc")) {
                _.each(unit.inc, include => {
                    if (_.has(include, "at")) {
                        document.addAt(include.at, include.add);
                    }
                });
            }
        });
        var doc = document.document();
        // log("create", "Document:", doc);
        doc = CharacterSheets.applyContext(doc);
        return doc;
    }

    return characterSheet;
};