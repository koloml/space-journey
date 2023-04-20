import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";

export const mainEventsPool: GameEventInit[] = [
    {
        text: "Epidemic on the ship!",
        choices: [
            {
                text: "ignore",
                run: game => {
                    game.resources.update(value => {
                        value.crew -= rand(5, 10)
                        return value
                    })
                    game.logger.log("ignore")
                }
            },
            {
                text: "find antidote",
                run: game => {
                    game.resources.update(value => {
                        value.crew -= rand(0, 5)
                        value.materials -= 5
                        return value
                    })
                    game.logger.log("antidote")
                }
            }
        ]
    }
];