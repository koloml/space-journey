import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";

export const positiveEventsPool: GameEventInit[] = [
    {
        text: "epidemic on the ship!",
        choices: [
            {
                text: "ignore",
                run: game => {
                    game.resources
                        .modify('crew', -rand(5, 10));
                    game.logger.log("ignore")
                }
            },
            {
                text: "find antidote",
                run: game => {
                    game.resources
                        .modify('crew', -rand(0, 5))
                        .modify('materials', -5);
                    game.logger.log("antidote")
                }
            }
        ]
    },
    {
        text: "asteroid on the way! Make a choice:",
        choices: [
            {
                text: "try to dodge",
                run: game => {
                    game.resources.modify("hull", -rand(5, 10));
                }
            }
        ]
    }
];