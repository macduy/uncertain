import * as React from "react"

/** Basic horizontal bar graph. */
export const BarGraph = (props: {value: number, max: number, class?: string}) => {
    const widthP = Math.min(1, props.value / props.max)

    return <div className="bar-graph">
        <div className={"bar-graph-bar " + props.class ?? "" } style={{ width: widthP * 100 + "%" }}></div>
    </div>
}