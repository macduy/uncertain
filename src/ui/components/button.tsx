import * as React from "react"

type Props = {
    label: string
    onClick: () => void
}

/** Simple button. */
export const Button = (props: Props) => (
    <div className="btn btn-primary mr-2" onClick={props.onClick}>
        { props.label }
    </div>
)
