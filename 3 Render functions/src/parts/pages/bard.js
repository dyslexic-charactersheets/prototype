const _ = require('lodash');

global.render_bard_page = function() {
    return render_page('bard', [
        render_layout('2l', [
            render_items([
                render_class_icon('bard'),
                render_h2('Bard'),
                render_section__primary('Muse', [
                    render_field({
                        unlabelled: true,
                        size: large,
                        wide: true,
                        value: "Maestro",
                    }),
                    render_p("Your muse inspires you to ever-greater "+
                        "heights of performance. You gain the Lingering "+
                        "Composition feat and add soothe to your spell repertoire."),
                ]),
                render_section('Compositions', [
                    render_articles({
                        zebra: true,
                    }, 5, num => render_article({
                        edit_title: true,
                        inset: true,
                        // action: "template",
                        icon: "action-template",
                    }, [
                        render_field({
                            unlabelled: true,
                            rows: 2,
                            wide: true,
                            multiline: true,
                        })
                    ]), [

                        render_article({
                            title: 'Inspire courage',
                            annotation: 'Composition',
                            icon: "action",
                            inset: true,
                            meta: {
                                "Area": "60-foot aura",
                                "Duration": "1 round",
                            }
                        }, [
                            render_row({
                                unlabelled: true,
                            }, [
                                render_field({
                                    // legend: "Inspiration",
                                    unlabelled: true,
                                    output: true,
                                    value: "+1",
                                    width: 2,
                                }),
                                render_label("To attack rolls, damage rolls, and\nsaving throws against fear."),
                                render_spacer(),
                            ])
                            // render_p("You inspire your allies with words or tunes of "+
                            //     "encouragement. You and all allies in the aura gain "+
                            //     "a +1 conditional bonus to attack rolls, damage rolls, and saves "+
                            //     "against fear.")
                        ]),
                        
                        render_article({
                            title: 'Counter performance',
                            annotation: 'Composition',
                            icon: "reaction",
                            inset: true,
                            meta: {
                                "Trigger": "Save against an auditory or visual effect.",
                                "Area": "60-foot aura",
                            }
                        }, [
                            render_p("You and allies can use the "+
                                "higher of your Performance check or their saving throw.")
                        ]),

                    ]),
                ]),
                render_section('Spell Points', [
                    render_calc({
                        lines: 2,
                    }, [
                        render_field({
                            legend: "Spell\nPoints",
                            output: true,
                            width: large,
                        }),
                        render_span('='),
                        render_field({
                            label: "CHA",
                            underlay: "CHA",
                            ref: true,
                            mod: true,
                        }),
                        render_span('+'),
                        render_field({
                            label: "Bonus\nPoints",
                        })
                    ]),
                    render_field({
                        label: "Spell points today",
                        temp: true,
                        box: true,
                    })
                ]),
            ]),
            render_items([
                render_section('Cantrips', [
                    render_spells_table({
                        unlevelled: true,
                        max: 6,
                    }),
                ]),
                render_section('Spells', [
                    render_spells_table({
                        levels: "1-9",
                        max: 4,
                    }),
                ]),
                render_section('Bard Feats', [
                    render_feats_table({
                        max: 10,
                        levels: "2,4,6,8,10,14,18,20",
                        rows: 3,
                    })
                ]),
            ])
        ])
    ]);
}