import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";

export const specialEventsPool: Record<string, GameEventInit> = {
    _strangeMessagePositive: {
        text: "Text.",
        choices: [
            {
                text: "Text",
                run: game => {
                    game.logger.log("Text")
                }
            },
            {
                text: "Text",
                run: game => {
                    game.logger.log("Text")
                }
            },
        ]
    },
    _strangeMessageNegative: {
        text: "Text.",
        choices: [
            {
                text: "Text",
                run: game => {
                    game.logger.log("Text")
                }
            },
            {
                text: "Text",
                run: game => {
                    game.logger.log("Text")
                }
            },
        ]
    }
    /*
    keyName: {
        text: "Description",
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
            },
        ]
    }
    */
}