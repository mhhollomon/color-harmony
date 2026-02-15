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
                    <p className="color-swatch__label">hex:</p> <p className="color-swatch__color">{color.toFormatString('hex')}</p>
                    <p className="color-swatch__label">rgb:</p> <p className="color-swatch__color">{color.toFormatString('rgb')}</p>
                    <p className="color-swatch__label">hsl:</p> <p className="color-swatch__color">{color.toFormatString('hsl')}</p>
                    <p className="color-swatch__label">oklch:</p> <p className="color-swatch__color">{color.toFormatString('oklch')}</p>
                </div>
            </button>
        </>
    )
}
