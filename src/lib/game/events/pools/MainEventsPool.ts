import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";

export const mainEventsPool: GameEventInit[] = [
    {
        text: "Epidemic on the ship!",
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
    }
];