const _ = require('lodash');

global.render_cover_page = function() {
    return render_page('cover', [
        render_layout('2e', [
            render_g([
                render_logo(),

                render_prose([
                    render_p("Although Lem was raised in the lap of luxury, his childhood was anything but comfortable. He had the unfortunate luck to be born into slavery, to a mother indentured to one of Cheliax's countless noble families. Lem was sold a half dozen times to different nobles before he reached the age of two. Such is the fate of most of Cheliax's halflings (often called \"slips\" by that nation's citizens). Halflings are much valued as slaves in Cheliax since they take up less room and since their inborn optimism ironically stunts escape urges. Halflings born into slavery in Cheliax are prone to think of their lot in life as \"lucky.\" They are fond of saying, \"At least we aren't living in the gutter or starving!\""),
                    render_p("Nevertheless, halflings who rankle at the concept of enslavement do appear. Halflings like Lem. Growing up a slave in the devil-haunted empire of Cheliax exposed Lem to a shocking range of decadence and debauchery. He learned from a young age how to say what his superiors wanted to hear, and as he grew older, these skills often secured him less onerous jobs. While his kin toiled in basement washrooms or tended hellhound stables, Lem was taught to play the flute so he could entertain at family gatherings. Yet Lem was not blind to the discomfort of his brothers and sisters, and when he learned that a dozen of his kin were to be sacrificed to a devil as an offering to seal a new trade contract, Lem knew the time to act had come. Taking advantage of his increased mobility in the manor, it was a relatively simple trick to light a few fires in secret corners and then ensure that all of his halfling kin were safe in the slave's quarters. The manor burnt quickly, but Lem was shocked to see his kin rush back to the manor in a hopeless attempt to aid in extinguishing the flames. As the place burnt to the ground, and the halflings bemoaned their fate and the loss of their shelter, Lem slipped away into the night, bitter and distraught over this unexpected turn of events."),
                    render_p("Lem left Cheliax by stowing away on a merchant vessel and never looked back. He rarely speaks of his childhood today, but one can see its effects in his high disdain for law and order, and his intolerance for cruelty. Always quick to side with the underdog, Lem has learned that his most powerful traits are his optimism and sense of humor—virtues that almost make up for his small stature and impulsive nature. Lem's reasons for traveling with his current companions vary upon the day and his mood, but he certainly values their strengths—and the never-ending supply of comedy material their antics provide him."),
                ]),

                /*
                render_g([
                    render_field({
                        legend: "Ancestry",
                        size: huge,
                        wide: true,
                        value: "Halfling",
                    }),
                    // render_p("Claiming no place as their own, halflings control few settlements larger than villages. Instead, "+
                    //     "they frequently live among humans within the walls of larger cities, carving out small "+
                    //     "communities alongside other tall-folk. Many halflings lead perfectly fulfilling lives in the "+
                    //     "shadows of their larger neighbors, while others prefer a nomadic existence, traveling the world "+
                    //     "and taking advantage of opportunities and adventures as they come."),
                    render_field({
                        label: "Ethnicity",
                        align: left,
                        size: large,
                        wide: true,
                        value: "Chelaxian",
                    }),
                    // render_p("Infernal Cheliax remains one of the most powerful nations militarily in the Inner Sea region. "+
                    //     "Its control of the Arch of Aroden, the passage between the Inner Sea and the Arcadian Ocean, also gives "+
                    //     "it a vital role in much of the region's trade. Nevertheless, as important as the nation may be today, it "+
                    //     "pales in comparison to its former Imperial glories. Today, in the eyes of most external observers in other "+
                    //     "parts of the Inner Sea, Cheliax suffers from extreme diabolism and a tyranny which prevent it from truly "+
                    //     "achieving its full potential. Internal observers, including the new nobility of Cheliax, firmly believe "+
                    //     "that Asmodeus and Hell serve Cheliax and assist in maintaining the power necessary for Cheliax to assume "+
                    //     "its rightful role among the leading nations of the Inner Sea."),
                ]),
                render_hr({
                    swash: true
                }),
                render_g([
                    render_field({
                        legend: "Background",
                        size: huge,
                        wide: true,
                        value: "Entertainer",
                    }),
                    // render_p("Through an education in the arts or sheer, dogged practice, you "+
                    //     "learned to entertain crowds. You might have been an actor, a "+
                    //     "dancer, a musician, a magician, or any other sort of performer."),
                ]),
                render_hr({
                    swash: true
                }),
                render_g([
                    render_field({
                        legend: "Class",
                        size: huge,
                        wide: true,
                        value: "Bard",
                    }),
                    // render_p("You are a master of artistry, a scholar of hidden secrets, and a "+
                    //     "captivating persuader. Using powerful performances, you influence "+
                    //     "minds and elevate souls to new levels of heroics. You might use your "+
                    //     "powers to become a charismatic leader, or perhaps a counselor, "+
                    //     "manipulator, scholar, scoundrel, or virtuoso. While your versatility "+
                    //     "allows some to consider you a jack-of-all-trades and a beguiling ne’erdo-"+
                    //     "well who spends too much time in taverns, it’s dangerous to dismiss "+
                    //     "you as a master of none."),
                ]),
                */
                render_spacer(),
            ]),
            render_g([
                render_field({
                    legend: "Name",
                    wide: true,
                    size: huge,
                    align: left,
                    value: "Lem",
                }),
                render_row([
                    render_field({
                        label: "Ancestry",
                        size: large,
                        align: left,
                        wide: true,
                        value: "Halfling",
                    }),
                    render_field({
                        label: "Ethnicity",
                        align: left,
                        size: large,
                        wide: true,
                        value: "Chelaxian",
                    }),
                ]),
                render_field({
                    label: "Background",
                    align: left,
                    size: large,
                    wide: true,
                    value: "Entertainer",
                }),
                render_row([
                    render_field({
                        label: "Class",
                        size: large,
                        wide: true,
                        align: left,
                        value: "Bard",
                    }),
                    render_field({
                        label: "Specialisation",
                        size: large,
                        wide: true,
                        align: left,
                    }),
                ]),

                render_spacer(),
                render_portrait(),
            ])
        ])
    ]);
}

/*
global.render_cover_page = function() {
    return render_page('cover', [
        render_layout('2e', [
            render_g([
                render_logo(),
                render_field({
                    label: "Player",
                    align: left,
                    wide: true,
                }),
                render_portrait(),
                render_field({
                    legend: "Name",
                    wide: true,
                })
            ]),
            render_g([
                render_g([
                    render_field({
                        legend: "Ancestry",
                        size: huge,
                        wide: true,
                        value: "Halfling",
                    }),
                    render_p("Claiming no place as their own, halflings control few settlements larger than villages. Instead, "+
                        "they frequently live among humans within the walls of larger cities, carving out small "+
                        "communities alongside other tall-folk. Many halflings lead perfectly fulfilling lives in the "+
                        "shadows of their larger neighbors, while others prefer a nomadic existence, traveling the world "+
                        "and taking advantage of opportunities and adventures as they come."),
                    render_field({
                        label: "Ethnicity",
                        align: left,
                        size: large,
                        wide: true,
                        value: "Chelaxian",
                    }),
                    render_p("Infernal Cheliax remains one of the most powerful nations militarily in the Inner Sea region. "+
                        "Its control of the Arch of Aroden, the passage between the Inner Sea and the Arcadian Ocean, also gives "+
                        "it a vital role in much of the region's trade. Nevertheless, as important as the nation may be today, it "+
                        "pales in comparison to its former Imperial glories. Today, in the eyes of most external observers in other "+
                        "parts of the Inner Sea, Cheliax suffers from extreme diabolism and a tyranny which prevent it from truly "+
                        "achieving its full potential. Internal observers, including the new nobility of Cheliax, firmly believe "+
                        "that Asmodeus and Hell serve Cheliax and assist in maintaining the power necessary for Cheliax to assume "+
                        "its rightful role among the leading nations of the Inner Sea."),
                ]),
                render_hr({
                    swash: true
                }),
                render_g([
                    render_field({
                        legend: "Background",
                        size: huge,
                        wide: true,
                        value: "Entertainer",
                    }),
                    render_p("Through an education in the arts or sheer, dogged practice, you "+
                        "learned to entertain crowds. You might have been an actor, a "+
                        "dancer, a musician, a magician, or any other sort of performer."),
                ]),
                render_hr({
                    swash: true
                }),
                render_g([
                    render_field({
                        legend: "Class",
                        size: huge,
                        wide: true,
                        value: "Bard",
                    }),
                    render_p("You are a master of artistry, a scholar of hidden secrets, and a "+
                        "captivating persuader. Using powerful performances, you influence "+
                        "minds and elevate souls to new levels of heroics. You might use your "+
                        "powers to become a charismatic leader, or perhaps a counselor, "+
                        "manipulator, scholar, scoundrel, or virtuoso. While your versatility "+
                        "allows some to consider you a jack-of-all-trades and a beguiling ne’erdo-"+
                        "well who spends too much time in taverns, it’s dangerous to dismiss "+
                        "you as a master of none."),
                ]),
                render_spacer(),
            ])
        ])
    ])
}
*/