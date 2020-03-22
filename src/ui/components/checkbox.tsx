// Component for group of radios

import * as React from "react";

export interface CheckboxProps {
    id: string
    label: string
    onCheckedChange: (checked: boolean) => void,
    value: boolean,
}

export const Checkbox = (props: CheckboxProps) => (
    <div className="custom-control custom-switch">
        <input
            type="checkbox"
            className="custom-control-input"
            id={ props.id }
            checked={ props.value }
            onChange={ e => props.onCheckedChange(e.target.checked )} />
        <label key="label" className="label custom-control-label" htmlFor={ props.id }>{ props.label }</label>
    </div>
)
