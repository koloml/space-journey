import type {GameEventInit} from "@/lib/game/events/entities/GameEvent";

/**
 * Helper type to make sure that all keys of the specialEventsPool are typed correctly. This will prevent typos and
 * other errors when trying to access the pool events.
 */
type SpecialEventsKeys = {
    _strangeMessagePositive: null
    _strangeMessageNegative: null
};

export const specialEventsPool: Record<keyof SpecialEventsKeys, GameEventInit> = {
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