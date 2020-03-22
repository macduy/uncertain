import * as React from "react"
import { Checkbox } from "ui/components/checkbox"
import { Button } from "ui/components/button"
import { Model, advance } from "model/model"
import { format } from "date-fns"
import { BarGraph } from "ui/components/bar_graph"
import { Policy, evaluateTransmission } from "model/policy"

interface Props {

}

interface State {
    day: number
    model: Model
    policy: Policy
}

const startingPolicy: Policy = {
    closeSchools: false,
    closePubsAndRestaurants: false,
}

export class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            day: 0,
            model: {
                infected: 150,
                transmission: evaluateTransmission(startingPolicy),
            },
            policy: startingPolicy
        }
    }

    render() {
        return <div className="container">
            <CurrentDate day={this.state.day} />
            Infected: { this.state.model.infected }
            <BarGraph max={1000} value={this.state.model.infected} />

            <Checkbox id="policyCloseSchools" value={this.state.policy.closeSchools} onCheckedChange={v => this.setPolicy("closeSchools", v)} label="Close schools" />
            <Checkbox id="policyClosePubs" value={this.state.policy.closePubsAndRestaurants} onCheckedChange={v => this.setPolicy("closePubsAndRestaurants", v)} label="Close pubs and restaurants" />
            <Button label="Next day" onClick={ () => this.advance() } />
            <Button label="Start autorun" onClick={ () => this.startAutoRun() } />
        </div>
    }

    setPolicy(policy: keyof Policy, value: boolean) {
        const newPolicy = { ...this.state.policy }
        newPolicy[policy] = value

        this.setState({
            policy: newPolicy,
            model: {
                ...this.state.model,
                transmission: evaluateTransmission(newPolicy)
            }
        })
    }

    advance() {
        this.setState({
            day: this.state.day + 1,
            model: advance(this.state.model)
        })
    }

    startAutoRun() {
        setInterval(() => this.advance(), 500)
    }
}

const START_DATE = new Date()
START_DATE.setFullYear(2020)
START_DATE.setMonth(2, 1)

const CurrentDate = (props: { day: number }) => {
    const date = new Date()
    date.setDate(START_DATE.getDate() + props.day)

    return <div>
        { format(date, "d MMM yyyy") }
    </div>
}