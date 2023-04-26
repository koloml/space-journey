import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";
import {specialEventsPool} from "@/lib/game/events/pools/SpecialEventsPool";

export const positiveEventsPool: GameEventInit[] = [
    {
        text: "Sir! We caught an unknown message! What to do?",
        choices: [
            {
                text: "Accept",
                run: game => {
                    game.assignEvent(specialEventsPool._strangeMessagePositive)
                }
            },
            {
                text: "Ignore",
                run: game => {
                    game.logger.log("You ignored an unknown message")
                }
            },
        ]
    },
    {
        text: "Sir! There's an escape pod nearby, it sends a signal for help! What to do?",
        choices: [
            {
                text: "Go to help",
                run: game => {
                    game.resources.modify("crew", randInt(5, 10))
                    game.logger.log("Saved people have joined you")
                }
            },
            {
                text: "Ignore",
                run: game => {
                    game.logger.log("You ignored the escape pod's help signal")
                }
            }
        ]
    },
    {
        text: "Engineers figured out how to use energy more efficiently",
        choices: [
            {
                text: "Continue",
                run: game => {
                    game.energy.update(energy => {
                        energy.totalEnergy += 1
                        return energy
                    })
                    game.logger.log("Engineers on the ship saved one energy cell for free")
                }
            }
        ]
    },
    {
        text: "Botanists bred a new culture",
        choices: [
            {
                text: "Continue",
                run: game => {
                    game.resources.modify("food", randInt(5, 11))
                    game.logger.log("Farms produced a lot of food")
                }
            }
        ]
    },
    {
        text: "After calibrating the navigation systems, distance to the planet turned out to be a little shorter",
        choices: [
            {
                text: "Continue",
                run: game => {
                    game.journey.update(value => {
                        value.distance -= rand(1, 5)
                        return value
                    })
                    game.logger.log("After calibrating, the actual path to the planet turned out shorter.")
                }
            },
        ]
    },
    {
        text: "Many people were born on the ship in a very short time",
        choices: [
            {
                text: "Continue",
                run: game => {
                    game.resources.modify("crew", randInt(5, 11))
                    game.logger.log("Extraordinary birth rate spike on ship")
                }
            }
        ]
    },
    {
        text: "Due to a mistake, it turned out that the ship has more resources than it was in the census",
        choices: [
            {
                text: "Continue",
                run: game => {
                    if (!!randInt(0, 2)) {
                        game.resources.modify("materials", randInt(5, 11))
                        game.logger.log("It turned out that there was more materials on the ship than was calculated")
                    } else {
                        game.resources.modify("food", randInt(5, 11))
                        game.logger.log("It turned out that there was more food on the ship than was calculated")
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