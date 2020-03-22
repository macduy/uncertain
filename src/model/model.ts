export type Model = {
    infected: number,
    transmission: number
}

export function advance(model: Model): Model {
    return {
        infected: Math.floor(model.infected * model.transmission),
        transmission: model.transmission,
    }
}
