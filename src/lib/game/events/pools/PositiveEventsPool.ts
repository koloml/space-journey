import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";
import {specialEventsPool} from "@/lib/game/events/pools/SpecialEventsPool";

export const positiveEventsPool: GameEventInit[] = [
    {
        text: "Sir! We caught an unknown message! What to do?",
        choices: [
            {
                text: "Answer",
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