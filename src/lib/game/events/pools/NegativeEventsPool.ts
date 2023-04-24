import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";

export const negativeEventsPool: GameEventInit[] = [
    {
        text: "Sir! Epidemic on the ship! What to do?",
        choices: [
            {
                text: "Ignore",
                run: game => {
                    if (rand(0, 1) >= 0.20) {
                        game.resources
                            .modify('crew', -rand(5, 15))
                        game.logger.log("you ignored the epidemic, people died")
                    } else {
                        game.resources
                            .modify('crew', -rand(0, 5))
                        game.logger.log("you ignored the epidemic, the epidemic was not too dangerous")
                    }
                }
            },
            {
                text: "Find antidote",
                run: game => {
                    game.resources
                        .modify('materials', -rand(5, 15))
                    if (rand(0, 1) >= 0.80) {
                        game.resources
                            .modify('crew', -rand(5, 10))
                        game.logger.log("you found the antidote, but a lot of people have already died")
                    } else {
                        game.logger.log("you found the antidote and stop the epidemic")
                    }
                }
            }
        ]
    },
    {
        text: "Sir! Asteroid on the way! What to do?",
        choices: [
            {
                text: "Try to dodge",
                run: game => {
                    if (rand(0, 1) <= (game.systems.get("thrusters").energy * 0.3)) {
                        game.logger.log("The ship avoided an asteroid impact")
                    } else {
                        game.resources.modify("hull", -rand(5, 10))
                        game.logger.log("The ship was hit by a small asteroid")
                    }
                }
            },
            {
                text: "Block with shields",
                run: game => {
                    if (game.systems.get("shield").energy > 0) {
                        game.systems.energy("shield", game.systems.get("shield").energy - 1)
                        game.energy.update(value => {
                            value.totalEnergy -= 1
                            return value
                        })
                        game.logger.log("The asteroid crashed into the ship's shield")
                    } else {
                        game.resources.modify("hull", -rand(10, 15))
                        game.logger.log("The ship was hit by a small asteroid")
                    }
                }
            }
        ]
    },
    {
        text: "Overload in the generator, choose where to redirect it to neutralize it:",
        choices: [
            {
                text: "Farms",
                run: game => {
                    game.systems.destroy("farms")
                    game.logger.log("The farm system was overloaded and collapsed")
                }
            },
            {
                text: "Shield",
                run: game => {
                    game.systems.destroy("shield")
                    game.logger.log("The shields was overloaded and collapsed")
                }
            },
            {
                text: "Thrusters",
                run: game => {
                    game.systems.destroy("thrusters")
                    game.logger.log("The thrusters was overloaded and collapsed")
                }
            }
        ]
    },
    {
        text: "Instability in the generator. What to do?",
        choices: [
            {
                text: "Try to fix",
                run: game => {

                }
            }
        ]
    },
    {
        text: "The ship enters an energy anomaly. What to do?",
        choices: [
            {
                text: "Avoid",
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
                text: "Enter",
                run: game => {
                    game.logger.log("The ship bypassed the energy anomaly")
                }
            }
        ]
    },
];