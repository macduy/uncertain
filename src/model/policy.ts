export type Policy = {
    closeSchools: boolean
    closePubsAndRestaurants: boolean
}

export function evaluateTransmission(policy: Policy): number {
    var rate = 1.01
    if (!policy.closeSchools) {
        rate += 0.05
    }
    if (!policy.closePubsAndRestaurants) {
        rate += 0.1
    }
    return rate
}