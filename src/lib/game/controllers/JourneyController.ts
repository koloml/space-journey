import BaseController from "@/lib/game/base/BaseController";

export default class JourneyController extends BaseController {
    private _currentSpeedLyPerMonth = 0;

    onTick() {
        this._traverse();
        this._checkGameOver();
    }

    /**
     * Calculate the change in the speed of the ship and increase the distance traveled.
     * @private
     */
    private _traverse() {
        this._currentSpeedLyPerMonth += this._getThrustersAcceleration() - JourneyController._spaceResistance;
        this._currentSpeedLyPerMonth = Math.min(this._currentSpeedLyPerMonth, JourneyController._maxSpeed);
        this._currentSpeedLyPerMonth = Math.max(this._currentSpeedLyPerMonth, 0);

        this._game.journey.update(values => {
            values.traveled += this._currentSpeedLyPerMonth;
            return values;
        });
    }

    /**
     * Check if the game is completed. Game is considered completed when the distance traveled is greater than the
     * distance to the destination.
     * @private
     */
    private _checkGameOver() {
        if (this._game.journey.get('traveled') < this._game.journey.get('distance')) {
            return;
        }

        this._game.endGame(true);
    }

    private _getThrustersAcceleration() {
        const thrusters = this._game.systems.get('thrusters');

        return JourneyController._thrustersAcceleration
            * thrusters.energy
            * +thrusters.active;
    }

    private static readonly _thrustersAcceleration = 0.001
    private static readonly _spaceResistance = 0.0006;
    private static readonly _maxSpeed = 0.05;
}