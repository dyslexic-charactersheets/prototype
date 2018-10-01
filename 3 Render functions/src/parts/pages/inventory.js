const _ = require('lodash');

global.render_inventory_page = function() {
    return render_page__unbalanced('inventory', [
        render_layout('2r', [
            render_items([
                render_layout('2e', [
                    render_section('Magic Items', [
                        render_articles({
                            zebra: true,
                        }, 7, n => render_article({}, [
                                render_field({
                                    unlabelled: true,
                                    wide: true,
                                    rows: 2,
                                })
                            ])
                        )
                    ]),

                    render_portrait(),
                ]),

            ]),
            render_items([
                render_section('Inventory', [
                    render_articles({
                        zebra: true,
                    }, 15, n => render_field({
                            unlabelled: true,
                            wide: true,
                        })
                    ),
                ]),
            ])
        ]),

        render_layout('2r', [

            render_section('Resonance', [
                render_calc([
                    render_field('resonance', {
                        legend: "Resonance",
                        output: true,
                        overlay: "rp",
                        width: large,
                    }),
                    render_span("="),
                    render_field({
                        label: "CHA",
                        ref: true,
                        mod: true,
                        underlay: "CHA",
                    }),
                    render_span("+"),
                    render_field({
                        label: "Level",
                        ref: true,
                    }),
                    render_span("+"),
                    render_field({
                        label: "Misc",
                        misc: true,
                    })
                ]),
                render_row({
                    lines: 2,
                }, [
                    render_calc([
                        render_field({
                            label: "Free\nResonance",
                            output: true,
                            overlay: "rp",
                            width: large,
                        }),
                        render_span("="),
                        render_field({
                            label: "Resonance",
                        }),
                        render_span("&minus;"),
                        render_field({
                            label: "Worn\nItems",
                        })
                    ]),
                    render_field({
                        label: "Current\nResonance",
                        wide: true,
                        box: true,
                        temp: true,
                    }),
                    render_field({
                        label: "Overspend",
                    })
                ])
            ]),
            
            render_section('Bulk', [
                render_layout('2r', [
                    render_g([
                        render_calc([
                            render_field({
                                output: true,
                                legend: "Bulk limit",
                            }),
                            render_span('= 5 +'),
                            render_field({
                                label: "STR",
                                ref: true,
                                mod: true,
                                underlay: "STR",
                            }),
                        ]),
                        
                        render_calc({
                            lines: 2,
                        }, [
                            render_field({
                                output: true,
                                legend: "Upper\nlimit",
                            }),
                            render_span('= 10 +'),
                            render_field({
                                // label: "STR",
                                ref: true,
                                mod: true,
                                underlay: "STR",
                            }),
                        ]),
                    ]),
                    render_items([
                        render_field({
                            label: "Carrying",
                            horizontal: true,
                        }),
                        render_p({
                            align: right,
                        }, '10 L = 1 bulk'),
                    ])
                ])
            ]),
        ]),


        /* Ancestry */

        render_layout('2l', [
            render_section('Ancestry', [
                render_g([
                    render_field({
                        label: "Ancestry",
                        wide: true,
                        align: left,
                    }),
                    render_field({
                        label: "Ethnicity",
                        wide: true,
                        align: left,
                    }),
                    render_row([
                        render_field({
                            label: "Size",
                            icon: 'size',
                        }),
                        render_field({
                            label: "Abilities",
                            wide: true,
                            align: left,
                        }),
                    ]),
                ]),

                render_spacer(),

                render_article({
                    title: 'Heritage Feat',
                    icon: 'action-template',
                }, [
                    render_field({
                        wide: true,
                        rows: 3,
                        align: left,
                        unlabelled: true,
                    })
                ])
            ]),
            render_section('Ancestry Feats', [
                render_feats_table({
                    max: 6,
                    zebra: true,
                })
            ]),
        ]),

        /* Background and skill feats */

        render_layout('2l', [
            render_section('Background', [
                render_field({
                    label: "Background",
                    wide: true,
                    align: left,
                }),
                render_field({
                    label: "Lore",
                    wide: true,
                    align: left,
                    icon: "proficiency-trained",
                }),
                
                render_article({
                    title: 'Skill Feat',
                    icon: 'action-template',
                }, [
                    render_field({
                        wide: true,
                        rows: 3,
                        align: left,
                        unlabelled: true,
                    })
                ]),
            ]),
            render_section('Skill Feats', [
                render_feats_table({
                    max: 8,
                })
            ])
        ]),
    ])
}