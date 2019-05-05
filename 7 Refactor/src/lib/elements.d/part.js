'use strict';

CharacterSheets.register('part', false, {
	name: "foo"
}, args => {
	if (_.has(args, "name"))
		console.log("I can has name.");
	return `<div>${args.name}</div>`;
});
