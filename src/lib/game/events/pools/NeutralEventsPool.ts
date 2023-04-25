import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";

export const neutralEventsPool: GameEventInit[] = [
    {
        text: "Sir! The ship enters an energy anomaly. What to do?",
        choices: [
            {
                text: "Enter",
                run: game => {
                    if (!!randInt()) {
                        game.energy.update(value => {
                            value.totalEnergy += 1
                            return value
                        })
                        game.logger.log("An anomaly caused one of your energy cells to charge")
                    } else {
                        game.energy.update(value => {
                            value.totalEnergy -= 1
                            return value
                        })
                        game.logger.log("An anomaly caused one of your energy cells to lose its charge.")
                    }
                }
            },
            {
                text: "Avoid",
                run: game => {
                    game.logger.log("The ship bypassed the energy anomaly")
                }
            }
        ]
    },
    {
        text: "Sir! Near the wreckage of some ship.",
        choices: [
            {
                text: "Search resources",
                run: game => {
                    game.logger.log("You found resources")
                    game.resources
                        .modify("food", randInt(3, 11))
                        .modify("materials", randInt(3, 11))
                    if (!!randInt()) {
                        if (game.systems.discharge("shield")) {
                            game.logger.log("A ship wreck crashed into your ship's shield")
                        } else {
                            game.resources.modify("hull", -randInt(5, 11))
                            game.logger.log("A ship wreck rams your ship")
                        }
                    }
                }
            },
            {
                text: "Ignore",
                run: game => {
                    game.logger.log("Text")
                }
            }
        ]
    },
    {
        text: "Sir! Abandoned station nearby! What to do?",
        choices: [
            {
                text: "Search food",
                run: game => {
                    game.resources.modify("food", randInt(5, 11))
                    game.logger.log("You found materials at an abandoned station")
                    if (!!randInt()) {
                        game.resources.modify("crew", -randInt(1, 6))
                        game.logger.log("People died on the expedition")
                    }
                }
            },
            {
                text: "Search materials",
                run: game => {
                    game.resources.modify("materials", randInt(5, 11))
                    game.logger.log("You found materials at an abandoned station")
                    if (!!randInt()) {
                        game.resources.modify("crew", -randInt(1, 6))
                        game.logger.log("People died on the expedition")
                    }
                }
            },
            {
                text: "Ignore",
                run: game => {
                    game.logger.log("The ship passes by an abandoned station")
                }
            },
        ]
    }
    /*
    {
        text: "Description. What to do?",
        choices: [
            {
                text: "Variant1",
                run: game => {
                    game.logger.log("Text1")
                }
            },
            {
                text: "Variant2",
                run: game => {
                    game.logger.log("Text2")
                }
            }
        ]
    }.
    */
];