import ColorSwatch from "~/components/colorSwatch"

import { range } from "~/lib/range"
import './swatchGroup.css'
import type { SwatchDatum } from "~/lib/types/swatchDatum"


export type SwatchGroupProps = {
    colors: SwatchDatum[],
    category: string,
    className?: string
}


export default function SwatchGroup({ colors, category, className }: SwatchGroupProps) {
    let classes = 'swatch-group__grid'
    if (className) classes += ` ${className}`

    return (
        <div className={classes}>
            {range(0, colors.length).map((i) => {
                const current = colors[i];
                const label = current.label ? current.label : " ";
                return (
                    <div className="swatch-group__output" key={i}>
                        <ColorSwatch color={current.color}
                            className="swatch-group__swatch" key={`${i}-${category}`} index={`${category}-${i}`} />
                        <div className="swatch-group__label"
                            key={`${i}-label`}
                        >
                            {label}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
