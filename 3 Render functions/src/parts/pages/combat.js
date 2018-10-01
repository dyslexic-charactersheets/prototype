const _ = require('lodash');

global.render_combat_page = () => render_page('core', [
    render_layout('2l', [
        render_g([
            render_section('Class DC', [
                render_calc([
                    render_field({
                        label: "Class DC",
                        output: true,
                        icon: "modifier",
                        width: double,
                        underlay: "DC",
                    }),
                    render_span("="),
                    render_field({
                        ref: true,
                        label: "Key Ability",
                    }),
                    render_span("+"),
                    render_field({
                        ref: true,
                        label: "Level",
                    }),
                    render_span("+"),
                    render_field({
                        misc: true,
                        label: "Item",
                    })
                ]),
                render_field({
                    label: "Conditional",
                    align: left,
                    wide: true,
                }),
            ]),
            render_section('Speed', [
                render_table({}, [], [
                    [
                        render_field({
                            template: "speed",
                            legend: "Speed"
                        }),
                        null,
                        render_field({
                            template: "speed",
                            label: "Speed in Armour",
                            ref: true,
                        }),
                    ], [
                        render_field({
                            template: "speed",
                            label: "Swim Speed"
                        }),
                        render_field({
                            template: "speed",
                            label: "Climb Speed"
                        }),
                        render_field({
                            template: "speed",
                            label: "Fly Speed"
                        }),
                    ]
                ])
            ]),
            render_section('Saving Throws', [
                render_table({}, [
                    null, null, "Ability\nModifier", "Proficiency", "Item", "Misc"
                ], [
                    { save: "Fortitude", underlay: "FORT", ability: "CON" },
                    { save: "Reflex", underlay: "REF", ability: "DEX" },
                    { save: "Will", underlay: "WILL", ability: "WIS" },
                ], row => [
                    render_field({
                        output: true,
                        legend: row.save,
                        underlay: row.underlay,
                        icon: "modifier",
                        width: double,
                    }),
                    render_span("="),
                    render_field({
                        ref: true,
                        // h_label: true,
                        label: row.ability,
                        underlay: row.ability,
                    }),
                    render_field({
                        template: "proficiency",
                    }),
                    render_field({
                    }),
                    render_field({
                        misc: true,
                    })
                ]),
                render_field({
                    label: "Conditional",
                    align: left,
                    wide: true,
                    rows: 2,
                }),
            ])
        ]),
        render_g([
            render_section('Attacks', [
                render_articles({
                    zebra: true
                }, 4, n => render_article({

                }, [
                    render_row([
                        render_field({
                            template: "proficiency",
                            label: "Item Bonus",
                        }),
                        render_field({
                            align: left,
                            wide: true,
                        })
                    ]),
                    render_row([
                        render_calc([
                            render_field({
                                output: true,
                                label: "Attack Bonus",
                                width: triple,
                                icon: "bonus",
                            }),
                            render_span("="),
                            render_field({
                                ref: true,
                            }),
                            render_field({
                                template: "proficiency",
                                label: "Proficiency",
                            }),
                            render_field({
                                label: "Item",
                            })
                        ]),
                        render_field({
                            label: "Damage",
                            template: "damage",
                            box: true,
                            icon: "damage",
                        }),
                        render_field({
                            label: "Type",
                        }),
                        render_field({
                            label: "Critical Effect",
                            wide: true,
                        })
                    ])
                ])),
                /* Ammo */
            ])
        ])
    ]),
    render_layout('2r', [
        render_g([
            render_section('Health', [
                render_row([
                    render_calc([
                        render_field('hp', {
                            output: true,
                            legend: "Hit Points",
                            icon: "hp",
                            width: double,
                            overlay: "hp",
                        }),
                        render_span("="),
                        render_field({
                            label: "Ancestry",
                        }),
                        render_span("+ ("),
                        render_field({
                            label: "Class",
                        }),
                        render_span("+"),
                        render_field({
                            ref: true,
                            underlay: "CON",
                        }),
                        render_span(") &times;"),
                        render_field({
                            ref: true,
                            label: "Level"
                        })
                    ]),
                    render_field({
                        template: 'progression',
                        label: "Dying",
                        separator: '&rsaquo;',
                        parts: [
                            render_field({
                                unlabelled: true,
                                template: 'checkbox',
                            }),
                            render_field({
                                unlabelled: true,
                                template: 'checkbox',
                            }),
                            render_field({
                                unlabelled: true,
                                template: 'checkbox',
                            }),
                            render_icon('evil', {
                                small: true,
                            })
                        ]
                    })
                ]),
                render_field({
                    label: "Current Hit Points",
                    wide: true,
                    temp: true,
                    box: true,
                    icon: "hp",
                    overlay: "hp",
                })
            ]),
            render_section('Armour Class', [
                render_table({}, [
                    null, null, "DEX", "Proficiency", "Armour\nBonus", "Shield\nBonus", "Misc"
                ], [
                    { legend: "Armour Class", icon: "ac", underlay: "AC" },
                    { legend: "Touch AC", icon: "tac", underlay: "TAC" },
                ], row => [
                    render_field({
                        output: true,
                        legend: row.legend,
                        icon: row.icon,
                        width: large,
                    }),
                    render_span("= 10 +"),
                    render_field({
                        ref: true,
                        underlay: "DEX",
                    }),
                    render_field({
                        template: "proficiency",
                    }),
                    render_field({
                    }),
                    render_field({
                    }),
                    render_field({
                        misc: true,
                    }),
                    ''
                ]),
                render_field({
                    label: "Conditional",
                    wide: true,
                    align: left,
                }),
                render_layout('2e', [
                    render_article({
                        title: 'Armour'
                    }, [
                        render_field({
                            // unlabelled: true,
                            wide: true,
                        }),
                        render_row([
                            render_field({
                                label: "AC Bonus",
                                icon: "ac",
                                width: double,
                            }),
                            render_field({
                                label: "TAC Bonus",
                                icon: "tac",
                                width: double,
                            }),
                            render_spacer(),
                            render_field({
                                label: "Bulk",
                            }),
                        ]),
                        render_row({
                            lines: double,
                        }, [
                            render_field({
                                label: "Max DEX\nto AC",
                                width: double,
                            }),
                            render_spacer(),
                            render_field({
                                label: "Speed\nPenalty",
                                template: 'speed',
                            }),
                            render_spacer(),
                            render_field({
                                label: "Armour Check\nPenalty",
                                width: double,
                            })
                        ]),
                        render_field({
                            label: "Properties",
                            align: left,
                            wide: true,
                            rows: 2,
                        }),
                    ]),
                    render_article({
                        title: 'Shield'
                    }, [
                        render_field({
                            // unlabelled: true,
                            wide: true,
                        }),
                        render_row([
                            render_field({
                                label: "AC Bonus",
                                icon: "ac",
                                width: double,
                            }),
                            render_field({
                                label: "TAC Bonus",
                                icon: "tac",
                                width: double,
                            }),
                            render_spacer(),
                            render_field({
                                label: "Bulk",
                            }),
                        ]),
                        render_row({
                            lines: double,
                        }, [
                            render_field({
                                label: "Max DEX\nto AC",
                                width: double,
                            }),
                            render_spacer(),
                            render_field({
                                label: "Speed\nPenalty",
                                template: 'speed',
                            }),
                            render_spacer(),
                            render_field({
                                label: "Armour Check\nPenalty",
                                width: double,
                            })
                        ]),
                        render_field({
                            label: "Properties",
                            align: left,
                            wide: true,
                            rows: 2,
                        }),
                    ])
                ])
            ])
        ]),
        render_g([
            render_section('Actions', [
                render_articles({
                    zebra: true,
                }, 7, n => render_article({
                    icon: "action-template",
                    inset: true,
                }, [
                    render_field({
                        unlabelled: true,
                        rows: 2,
                        wide: true,
                        multiline: true,
                    })
                ]))
            ])
        ])
    ]),
]);