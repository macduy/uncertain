import * as React from "react"
import { Policy } from "model/policy"
import { Checkbox } from "ui/components/checkbox"

type Props = {
    policy: Policy
    onPolicyChange: (policy: keyof Policy, value: boolean) => void
}

/** Mapping from policy key to displayable label. */
const policyLabels: [keyof Policy, string][] = [
    ["closeSchools", "Close schools"],
    ["closePubsAndRestaurants", "Close pubs & restaurants"]
]


/** Panel to automatically render policy toggles. */
export class PolicyPanel extends React.Component<Props> {
    render() {
        return <div className="mt-2">
            <h5 className="mb-0">Policies</h5>
            {
                policyLabels.map(([key, label]) =>
                    <Checkbox
                        id={"policy" + key}
                        value={this.props.policy[key]}
                        onCheckedChange={v => this.props.onPolicyChange(key, v)}
                        label={label} />)
            }
        </div>
    }
}