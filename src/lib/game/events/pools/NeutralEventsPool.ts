import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";
import type Game from "@/lib/game/Game";

function executeGravityAnomaly(game: Game) {
    if (rand() <= game.systems.get("thrusters").energy * 0.35) {
        game.journey.update(value => {
            value.traveled += rand(1, 3)
            return value
        })
        game.logger.log("With the help of a gravity anomaly, you save a couple of light years")
    } else {
        game.resources.modify("hull", randInt(1, 11))
        game.logger.log("Gravity anomaly damages your ship")
    }
}

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
    },
    {
        text: "Sir! The ship enters an gravity anomaly. What to do?",
        choices: [
            {
                text: "Enter",
                run: game => {
                    executeGravityAnomaly(game)
                }
            },
            {
                text: "Avoid",
                run: game => {
                    if (rand(0, 1) <= (game.systems.get("thrusters").energy * 0.45)) {
                        game.logger.log("The ship avoided an gravity anomaly")
                    } else {
                        executeGravityAnomaly(game)
                    }
                }
            }
        ]
    },
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
    },
    */
];