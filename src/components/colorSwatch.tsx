import type { Color } from "~/lib/color"
import './colorSwatch.css'
import { useGlobalStore } from "~/lib/globalStore";

export type ColorSwatchProps = {
    className?: string,
    color: Color,
    index: string,
    infoAction?: boolean,
    focusAction?: boolean,
}

const infoCircleFill = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg>


const boxArrowUpRight = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
</svg>

export default function ColorSwatch({ className, color, index, focusAction = true, infoAction = true}: ColorSwatchProps) {
    const { setBaseColor } = useGlobalStore();

    const classList = ["color-swatch"];
    if (className) {
        classList.push(className);
    }

    function onFocusClick() {
        if (focusAction) {
            setBaseColor(color);
        }
    }

    function contrastColor(clr : Color) : string {
        const l = clr.lightness();
        return l > 50 ? 'black' : 'white';
    }

    return (<>
        <div className={classList.join(' ')} style={{ backgroundColor: color.toString(), color : contrastColor(color) }}>
            <div className="color-swatch__action-grid">
                {infoAction && <button
                    className="color-swatch__action-button"
                    popoverTarget={`color-swatch__info-${index}`}
                    role="button"
                    aria-label="Show color information"
                    popoverTargetAction="toggle"
                >{infoCircleFill}
                    <div className="color-swatch__info" popover="auto" id={`color-swatch__info-${index}`}>
                        <p className="color-swatch__label">hex:</p> <p className="color-swatch__color">{color.toFormatString('hex')}</p>
                        <p className="color-swatch__label">rgb:</p> <p className="color-swatch__color">{color.toFormatString('rgb')}</p>
                        <p className="color-swatch__label">hsl:</p> <p className="color-swatch__color">{color.toFormatString('hsl')}</p>
                        <p className="color-swatch__label">oklch:</p> <p className="color-swatch__color">{color.toFormatString('oklch')}</p>
                    </div>
                </button>}
                {focusAction && <button
                    className="color-swatch__action-button"
                    role="button"
                    aria-label="Set color as Base color"
                    popoverTargetAction="toggle"
                    onClick={onFocusClick}
                >{boxArrowUpRight}
                </button>}
            </div>
        </div>
    </>)
}
