import type { Color } from "~/lib/color"
import './colorSwatch.css'

export type ColorSwatchProps = {
    className? : string,
    color : Color,
    index : string

}

export default function ColorSwatch({className, color, index} : ColorSwatchProps) {
    const classList = ["color-swatch"];
    if (className) {
        classList.push(className);
    }
    return (
        <>
            <button className={classList.join(' ')} style={{ backgroundColor: color.toString() }}
                popoverTarget={`color-swatch__info-${index}`}
                role="button"
                aria-label="Show color information"
                popoverTargetAction="toggle"
                >
                <div className="color-swatch__info" popover="auto" id={`color-swatch__info-${index}`}>
                    <p>hex:</p> <p className="color-swatch__color">{color.toHexString()}</p>
                    <p>rgb:</p> <p className="color-swatch__color"> {color.toRGBString()}</p>
                    <p>hsl:</p> <p className="color-swatch__color"> {color.toHSLString()}</p>
                </div>
            </button>
        </>
    )
}
