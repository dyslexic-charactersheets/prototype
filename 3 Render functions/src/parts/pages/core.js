const _ = require('lodash');

global.render_core_page = function() {
    return render_page('core', [
        render_layout('2l', [
            render_items([ // left column
                "<header><h1 class='logo'></h1></header>",
                render_section__untitled([
                    render_field('player-name', {
                        label: "Player",
                        align: left,
                        wide: true,
                    }),
                    render_row([
                        render_field('campaign', {
                            label: "Campaign",
                            align: left,
                            wide: true,
                        }),
                        render_field('xp', {
                            label: "XP",
                            underlay: "XP",
                            width: double,
                        }),
                    ])
                ]),
                render_section('Abilities', [
                    // ability score table
                    render_table({
                        unlabelled: true,
                    }, [
                        null,
                        "Ability\nScore",
                        "Ability\nModifier",
                        "Key\nAbility",
                        "Temporary\nAdjustment",
                    ], [
                        { ability: "Strength", short: "STR" },
                        { ability: "Dexterity", short: "DEX" },
                        { ability: "Contitution", short: "CON" },
                        { ability: "Intelligence", short: "INT" },
                        { ability: "Wisdom", short: "WIS" },
                        { ability: "Charisma", short: "CHA" },
                    ], row => [
                        render_h6(row.ability),
                        render_field(row.ability, {

                        }),
                        render_field(row.short, {
                            output: true,
                            icon: 'modifier',
                            underlay: row.short,
                        }),
                        render_field(null, {
                            template: 'radio',
                        }),
                        render_field(row.short+"_temp", {
                            temp: true
                        })
                    ]),

                    render_calc({
                        inline: true
                    }, [
                        render_field(null, {
                            label: "Ability\nModifier"
                        }),
                        render_span("= ("),
                        render_field(null, {
                            label: "Ability\nScore"
                        }),
                        render_span("- 10 ) &divide; 2"),
                    ])
                ]),
                render_section('Proficiency', [
                    // proficiency table
                    render_table({
                    }, [
                    ], [
                        [
                            render_field(null, {
                                template: "proficiency",
                                label: "Untrained",
                                output: true,
                            }),
                            render_field(null, {
                                template: "proficiency",
                                label: "Trained",
                                output: true,
                                proficiency: "trained",
                            }),
                            render_field(null, {
                                template: "proficiency",
                                label: "Expert",
                                output: true,
                                proficiency: "expert",
                            }),
                            render_field(null, {
                                template: "proficiency",
                                label: "Master",
                                output: true,
                                proficiency: "master",
                            }),
                            render_field(null, {
                                template: "proficiency",
                                label: "Legendary",
                                output: true,
                                proficiency: "legendary",
                            }),
                        ], [
                            '<label>Level<br>-2</label>',
                            '<label>Level<br>&nbsp;</label>',
                            '<label>Level<br>+1</label>',
                            '<label>Level<br>+2</label>',
                            '<label>Level<br>+3</label>'
                        ]
                    ]),
                    render_table({
                        unlabelled: true,
                        zebra: true,
                    }, [
                        "Ability",
                        "Proficiency"
                    ], repeat_item(8, {}), row => [
                        render_field(null, {
                            wide: true,
                        }),
                        render_field(null, {
                            template: "proficiency",
                        })
                    ])
                ]),
                render_section('Perception', [
                    render_calc([
                        render_field({
                            output: true,
                            label: "Perception",
                            icon: "bonus",
                            width: double,
                        }),
                        render_span("="),
                        render_field({
                            label: "WIS",
                            mod: true,
                            ref: true,
                            underlay: "WIS",
                        }),
                        render_field({
                            template: "proficiency",
                            label: "Proficiency",
                        }),
                        render_field({
                            label: "Item",
                        }),
                        render_field({
                            misc: true,
                            label: "Misc",
                        })
                    ]),
                    render_row({
                        unlabelled: true,
                    }, [
                        render_field({
                            template: 'checkbox',
                            label: "Low-light vision",
                        }),
                        render_field({
                            template: 'checkbox',
                            label: "Darkvision",
                        }),
                        render_field({
                            template: 'checkbox',
                            label: "Scent",
                        }),
                    ]),
                    render_field({
                        unlabelled: true,
                        wide: true,
                    })
                ]),
                render_section('Languages', [
                    render_field('languages', {
                        unlabelled: true,
                        wide: true,
                        rows: 2,
                    })
                ])
            ]),
            render_items([ // right column
                
                render_section__primary('Character', [
                    render_layout('alignment', [
                        render_g([
                            render_field('character-name', {
                                legend: 'Name',
                                align: left,
                                wide: true,
                            }),
                            render_row([
                                render_field('gender', {
                                    label: 'Gender',
                                    icon: 'gender',
                                    width: 3,
                                }),
                                render_field('age', {
                                    label: 'Age',
                                    width: 2,
                                }),
                                render_spacer(),
                            ]),
                        ]),
                        render_field('alignment', {
                            template: 'alignment'
                        })
                    ])
                ]),

                render_section('Ancestry', [
                    render_layout('2e', [
                        render_field('ancestry-name', {
                            align: left,
                            label: "Ancestry",
                            wide: true,
                        }),
                        render_field('ancestry-ethnicity', {
                            align: left,
                            label: "Ethnicity",
                            wide: true,
                        }),
                    ]),
                    render_row([
                        render_field('ancestry-abilities', {
                            label: "Abilities",
                            align: left,
                            wide: true,
                        }),
                        render_field('ancestry-size', {
                            label: "Size",
                            icon: 'size',
                        }),
                    ]),
                ]),
                render_section('Background', [
                    render_field('background-name', {
                        label: "Background",
                        align: left,
                        wide: true,
                    }),
                ]),
                render_section('Class', [
                    render_row([
                        render_field('class-name', {
                            label: "Class",
                            align: left,
                            wide: true,
                        }),
                        render_field('class-level', {
                            label: 'Level',
                            box: true
                        })
                    ]),
                    render_h4('Archetypes'),
                    render_field('archetype', {
                        unlabelled: true,
                        rows: 2,
                        wide: true,
                    })
                ]),
                render_section('Skills', [
                    // skills table
                    render_table({
                        unlabelled: true,
                        zebra: true,
                    }, [
                        null,
                        "Assurance",
                        "Skill\nBonus",
                        null,
                        "Ability\nModifier",
                        "Proficiency",
                        "Feats\nMisc",
                        "Armor\nCheck\nPenalty"
                    ], [
                        { skill: "Acrobatics", ability: "DEX", acp: true },
                        { skill: "Arcana", ability: "INT" },
                        { skill: "Athletics", ability: "STR", acp: true },
                        { skill: "Crafting", ability: "INT" },
                        { skill: "Deception", ability: "CHA" },
                        { skill: "Intimidation", ability: "CHA" },
                        { skill: "Medicine", ability: "WIS" },
                        { skill: "Nature", ability: "WIS" },
                        { skill: "Occultism", ability: "INT" },
                        { skill: "Performance", ability: "CHA" },
                        { skill: "Religion", ability: "WIS" },
                        { skill: "Society", ability: "INT" },
                        { skill: "Stealth", ability: "DEX", acp: true },
                        { skill: "Survival", ability: "WIS" },
                        { skill: "Thievery", ability: "DEX", acp: true },
                        { skill: "Lore", ability: "INT" },
                        { skill: "", ability: "INT" },
                        { skill: "", ability: "INT" },
                    ], row => [
                        render_h6(row.skill),
                        render_field(row.skill+'_assurance', {
                            template: 'checkbox',
                        }),
                        render_field(row.skill, {
                            output: true,
                            icon: "bonus",
                        }),
                        render_span('='),
                        render_field(null, {
                            ref: row.ability,
                            label: row.ability,
                            mod: true,
                            h_label: true,
                            underlay: row.ability
                        }),
                        render_field(null, {
                            template: "proficiency",
                        }),
                        render_field(null, {
                            misc: true,
                        }),
                        (_.has(row, "acp") && row.acp)
                            ? render_field(null, {
                                box: true
                            }) 
                            : null
                    ]),
                    render_row([
                        
                    ])
                ]),
            ])
        ])
    ]);
}