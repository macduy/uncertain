import * as React from "react"
import { Button } from "ui/components/button"
import { Model, Parameters, advance } from "model/model"
import { format } from "date-fns"
import { BarGraph } from "ui/components/bar_graph"
import { Policy, evaluateTransmission } from "model/policy"
import { PolicyPanel } from "ui/policy_panel"

interface Props {

}

interface State {
    day: number
    model: Model
    policy: Policy
    params: Parameters
}

const startingPolicy: Policy = {
    closeSchools: false,
    closePubsAndRestaurants: false,
}

/** Wrapper for the entire app. All states and data are stored here. */
export class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            day: 0,
            model: {
                infected: 150,
                dead: 0,
                recovered: 0,
            },
            params: {
                transmission: evaluateTransmission(startingPolicy),
            },
            policy: startingPolicy
        }
    }

    render() {
        return <div className="container">
            <CurrentDate day={this.state.day} />
            <BarGraph max={180} value={this.state.day} class="day" />

            Infected: { this.state.model.infected }
            <BarGraph max={1000} value={this.state.model.infected} />

            Recovered: { this.state.model.recovered }
            <BarGraph max={1000} value={this.state.model.recovered} />

            Dead: { this.state.model.dead }
            <BarGraph max={500} value={this.state.model.dead} />

            <PolicyPanel policy={this.state.policy} onPolicyChange={(policy, value) => this.setPolicy(policy, value)} />

            <Button label="Next day" onClick={ () => this.advance() } />
            <Button label="Start autorun" onClick={ () => this.startAutoRun() } />
        </div>
    }

    setPolicy(policy: keyof Policy, value: boolean) {
        const newPolicy = { ...this.state.policy }
        newPolicy[policy] = value

        this.setState({
            policy: newPolicy,
            params: {
                transmission: evaluateTransmission(newPolicy)
            }
        })
    }

    advance() {
        this.setState({
            day: this.state.day + 1,
            model: advance(this.state.model, this.state.params)
        })
    }

    startAutoRun() {
        setInterval(() => this.advance(), 250)
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