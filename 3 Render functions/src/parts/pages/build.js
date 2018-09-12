const _ = require('lodash');

global.render_build_page = function() {
    return render_page('core', [

        render_layout('2l', [
            render_h2('Build a Character'),
            render_section('Character Concept', [
                render_field('build--concept', {
                    label: "I'm awesome because...",
                    align: left,
                    wide: true,
                    rows: 2,
                })
            ])
        ]),
        
        render_layout('2l', [
            render_section("Step one", [
                render_p("Pick your race and where your character comes from.")
            ]),
            render_section('Ancestry', [
                render_layout('2e', [
                    render_field('build--ancestry', {
                        label: "Ancestry",
                        wide: true,
                    }),
                    render_field('build--ancestry--ethnicity', {
                        label: "Ethnicity",
                        wide: true,
                    }),
                ]),
                render_layout('2e', [
                    render_row([
                        render_field(null, {
                            label: "Hit points",
                            icon: "hp",
                        }),
                        render_field(null, {
                            label: "Size",
                            icon: "size",
                        }),
                        render_field(null, {
                            label: "Speed",
                            width: triple,
                            overlay: "ft",
                        }),
                    ]),
                    render_field(null, {
                        label: "Ancestry feat",
                        wide: true,
                    })
                ])
            ])
        ]),

        render_layout('2l', [
            render_section("Step two", [
                render_p("Decide how your character grew up.")
            ]),
            render_section("Background", [
                render_layout('2e', [
                    render_field(null, {
                        label: "Background",
                        wide: true,
                    }),
                    render_field(null, {
                        label: "Skill feat",
                        wide: true,
                    })
                ])
            ])
        ]),

        render_layout('2l', [
            render_section("Step three", [
                render_p("Pick from one of the main classes."),
                render_p("Depending on your class, you will likely need to pick a specialisation at the same time. These include a Sorcerer's bloodline, a Cleric's domain or a Barbarian's totem.")
            ]),
            render_section("Class", [
                render_layout('2e', [
                    render_field(null, {
                        label: "Class",
                        wide: true,
                    }),
                    render_field(null, {
                        label: "Specialisation",
                        wide: true,
                    })
                ]),
                render_row([
                    render_field('build--class--hp', {
                        label: "Hit Points",
                        icon: "hp",
                    }),
                    render_field('build--class--key-ability', {
                        label: "Key Ability",
                    }),
                ])
            ])
        ]),

        render_layout('2l', [
            render_section("Step four", [
                render_article("Ability Scores", [
                    render_p("Add up the ability score bonuses you get from your ancestry, background and class, each of which provides +2 or -2 to a number of abilities. You also get four free ability boosts to allocate as you wish."),
                    render_p("No ability score may be above 18 at level one."),
                    render_calc({
                        inline: true,
                    }, [
                        render_label("Ability\nModifier"),
                        render_span("= ("),
                        render_label("Ability\nScore"),
                        render_span("&divide; 2)")
                    ]),
                    render_p("Your key ability comes from your class, and is used to determine your class DC.")
                ])
            ]),
            render_section("Details", [
            ])
        ]),

        render_layout('2l', [
            render_article("Health", [
                render_p("Calculate your starting hit points.")
            ]),
            render_calc([
                render_field('build--detail--hp', {
                    output: true,
                    label: "Hit Points",
                    icon: "hp",
                }),
                render_span("="),
                render_field(null, {
                    label: "Ancestry",
                }),
                render_span("+ ("),
                render_field(null, {
                    label: "Class",
                }),
                render_span("+"),
                render_field(null, {
                    ref: true,
                    underlay: "CON",
                }),
                render_span(") &times;"),
                render_field(null, {
                    ref: true,
                    label: "Level",
                    underlay: "1"
                })
            ])
        ]),

        render_layout('2l', [
            render_article("Proficiencies", [
                render_p("Refer to your ancestry, background, class and feats to find your initial proficiencies."),
                render_p("Then spend the skill proficiencies your class provides to upgrade skills.")
            ]),
        ]),

        render_layout('2l', [
            render_section("Step five", [
                render_p("Work out what your character owns at the start of the game, including clothes and weapons."),
                render_h5("Starting money"),
                render_h6("150 sp")
            ]),
            render_section("Equipment", [
            ])
        ]),
    ])
}