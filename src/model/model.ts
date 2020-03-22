export type Model = {
    infected: number,
}

export function advance(model: Model) {
    return {
        infected: Math.floor(model.infected * 1.05)
    }
}
