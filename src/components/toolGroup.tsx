import type { JSX } from "react";
import "./toolGroup.css"

export interface toolGroupData {
    title : string | JSX.Element,
    tooltip? : string | JSX.Element,
    callback : () => void,
}

export interface toolGroupProps {
    tools : toolGroupData[],
    className? : string
}
export default function ToolGroup({tools, className} : toolGroupProps) {
    const classes = `tool-group ${className ? className : ""}`

    return (<>
        <ul className={classes}>
            {tools.map((tool, i) => {
                return (
                    <li className="tool-group__item" key={i}>
                        <a className="tool-group__button"
                                onClick={tool.callback}>{tool.title}
                            {tool.tooltip && <p className="tool-group__tooltip"
                                >{tool.tooltip}</p>}
                        </a>
                    </li>
                )
            })}
        </ul>

    </>)
}
