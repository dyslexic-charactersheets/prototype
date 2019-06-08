'use strict';

CharacterSheets.register('part', {
	defaults: {
		name: "foo"
	}, 
	render: args => {
		if (_.has(args, "name"))
			console.log("I can has name.");
		return `<div>${args.name}</div>`;
	}
});
