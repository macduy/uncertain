/** Model for the current state of the country. */
export type Model = {
    infected: number,
    dead: number,
    recovered: number
}

/** Parameters affecting the virus, usually not varied by time. */
export type Parameters = {
    transmission: number
}

/** Fixed parameters, usually related to the virus. Cannot be changed at all. */
namespace Const {
    /** Overall death rate. */
    export const DEATH_RATE = 0.01
    /** Recovery rate for infected people. */
    export const RECOVERY_RATE = 0.05
}

/** Computes the next state of the model, after 1 day has elapsed. */
export function advance(model: Model, params: Parameters): Model {
    const newRecovered = roundDown(model.infected * Const.RECOVERY_RATE)
    const newDeaths = roundDown(model.infected * Const.DEATH_RATE)
    const totalInfected = roundDown((model.infected - newDeaths - newRecovered) * (1 + params.transmission))

    return {
        infected: totalInfected,
        dead: model.dead + newDeaths,
        recovered: model.recovered + newRecovered
    }
}

/** Rounds down. */
function roundDown(n: number): number {
    return Math.floor(n)
}