import * as React from "react"

export const BarGraph = (props: {value: number, max: number}) => {
    const widthP = Math.min(1, props.value / props.max)

    return <div className="bar-graph">
        <div className="bar-graph-bar" style={{ width: widthP * 100 + "%" }}></div>
    </div>
}