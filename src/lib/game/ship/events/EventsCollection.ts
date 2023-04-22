import type {GameEventInit} from "@/lib/game/ship/events/decisions/GameEvent";

export const eventsCollection: GameEventInit[] = [
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
                    game.logger.log("you ignore the epidemic on the ship")
                }
            },
            {
                text: "find antidote",
                run: game => {
                    game.resources.update(value => {
                        value.crew -= rand(0, 5)
                        value.matter -= 5
                        return value
                    })
                    game.logger.log("you fought the epidemic on the ship")
                }
            }
        ]
    }
];