import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";
import {specialEventsPool} from "@/lib/game/events/pools/SpecialEventsPool";

export const negativeEventsPool: GameEventInit[] = [
    {
        text: "Sir! Epidemic on the ship! What to do?",
        choices: [
            {
                text: "Ignore",
                run: game => {
                    if (rand(0, 1) >= 0.20) {
                        game.resources
                            .modify('crew', -randInt(5, 16))
                        game.logger.log("you ignored the epidemic, people died")
                    } else {
                        game.resources
                            .modify('crew', -randInt(1, 6))
                        game.logger.log("you ignored the epidemic, the epidemic was not too dangerous")
                    }
                }
            },
            {
                text: "Find antidote",
                run: game => {
                    game.resources
                        .modify('materials', -randInt(5, 16))
                    if (rand(0, 1) >= 0.80) {
                        game.resources
                            .modify('crew', -randInt(5, 11))
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
                        if (game.systems.discharge("shield")) {
                            game.logger.log("An asteroid crashed into the ship's shield")
                        } else {
                            game.systems.destroyRandom()
                            game.resources.modify("hull", randInt(5, 11))
                            game.logger.log("An asteroid is destroying one of your systems")
                        }
                    }
                }
            },
            {
                text: "Block with shields",
                run: game => {
                    if (game.systems.discharge("shield")) {
                        game.logger.log("The asteroid crashed into the ship's shield")
                    } else {
                        game.resources.modify("hull", -randInt(5, 11))
                        game.logger.log("The ship was hit by a small asteroid")
                    }
                }
            }
        ]
    },
    {
        text: "Overload in the generator system! Redirect impulse to:",
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
        text: "A fast-moving asteroid crashes into your ship",
        choices: [
            {
                text: "Continue",
                run: game => {
                    if (game.systems.discharge("shield")) {
                        game.logger.log("A fast-moving asteroid crashed into the ship's shield")
                    } else {
                        game.systems.destroyRandom()
                        game.resources.modify("hull", randInt(5, 11))
                        game.logger.log("A fast-moving asteroid is destroying one of your systems")
                    }
                }
            }
        ]
    },
    {
        text: "Sir! We caught an unknown message! What to do?",
        choices: [
            {
                text: "Answer",
                run: game => {
                    game.assignEvent(specialEventsPool._strangeMessageNegative)
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
        text: "Sir! There was a fire on the storage section! What to do?",
        choices: [
            {
                text: "Save materials",
                run: game => {
                    game.resources
                        .modify("materials", -randInt(1, 6))
                        .modify("crew", -randInt(1, 3))
                    game.logger.log("Fire on the ship! The crew saved some of the resources, but someone died")
                }
            },
            {
                text: "Save crew",
                run: game => {
                    game.resources
                        .modify("materials", -randInt(5, 11))
                    game.logger.log("Fire on the ship! You have lost some of the materials")
                }
            }
        ]
    },
    {
        text: "Detectors report a burst of radiation coming from a nearby star",
        choices: [
            {
                text: "Continue",
                run: game => {
                    if (game.systems.get("shield").energy > 0) {
                        game.logger.log("Radiation burst is blocked by your shield")
                    } else {
                        game.resources
                            .modify("crew", -randInt(1, 16))
                        game.logger.log("People are dying from radiation sickness caused by a burst of radiation")
                    }
                }
            }
        ]
    },
    {
        text: "A short circuit has occurred in one of your systems",
        choices: [
            {
                text: "Continue",
                run: game => {
                    switch (randInt(1, 5)) {
                        case 1: {
                            if (game.systems.get("farms").energy > 0) {
                                game.logger.log("A short circuit occurred on the farms, you lost one energy cell")
                            } else {
                                game.logger.log("A short circuit occurred on the farms, but nothing was damaged as the farms weren't powered")
                            }
                            break
                        }
                        case 2: {
                            if (game.systems.get("shield").energy > 0) {
                                game.logger.log("A short circuit occurred in the shield system, you lost one energy cell")
                            } else {
                                game.logger.log("A short circuit occurred in the shield system, but nothing was damaged as the shields weren't powered")
                            }
                            break
                        }
                        case 3: {
                            if (game.systems.get("thrusters").energy > 0) {
                                game.logger.log("A short circuit occurred on the thrusters, you lost one energy cell")
                            } else {
                                game.logger.log("A short circuit occurred on the thrusters, but nothing was damaged as the thrusters weren't powered")
                            }
                            break
                        }
                        case 4: {
                            if (game.systems.get("generator").energy > 0) {
                                game.logger.log("A short circuit occurred in the generator, you lost one energy cell")
                            } else {
                                game.logger.log("A short circuit occurred in the generator, but nothing was damaged as the generator weren't powered")
                            }
                            break
                        }
                    }
                }
            }
        ]
    },
    {
        text: "The ship mysteriously lost some of the resources",
        choices: [
            {
                text: "Continue",
                run: game => {
                    if (!!randInt()) {
                        game.resources.modify("materials", -randInt(1, 11))
                        game.logger.log("Part of the materials was missing from the ship in an unknown way")
                    } else {
                        game.resources.modify("food", -randInt(1, 11))
                        game.logger.log("Part of the food was missing from the ship in an unknown way")
                    }
                }
            }
        ]
    },
    /*{
        text: "There was a short circuit in the energy collector, one energy cell is lost",
        choices: [
            {
                text: "Variant1",
                run: game => {
                    game.logger.log("There was a short circuit in the energy collector, one energy cell is lost")
                }
            }
        ]
    },*/
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