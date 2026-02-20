import { Slider } from "radix-ui";

import './colorSlider.css'

export type ColorSliderProps = {
    min: number,
    max: number,
    title: string,
    step?: number,
    value: number,
    display?: number,
    onChange: (value: number) => void,
    gradientStart?: string,
    gradientEnd?: string
}

export default function ColorSlider({ min, max, value, display, step, title, onChange, gradientStart, gradientEnd }: ColorSliderProps) {
    /***** NOTE
     * The slide compoment doesn't seem to handle negative values well.
     * (E.g. a range from -40 to 40 doesn't work)
     * So the parent will need to do a translation.
     *
     * @param display is the value that will shown in the UI.
     * @param value is the value that should be used in the slider.
     */
    function onSliderChange(value: number[]) {
        console.log(`-- colorslider '${title}' changing to ${value[0]}`)
        onChange(value[0]);
    }
    step ??= 5;
    display ??= value;
    gradientStart ??= '#000000';
    gradientEnd ??= '#ffffff';
    console.log(`-- colorslider current value = ${value}`)
    return (<>
        <p className="color-slider__label">{title}</p>
        <Slider.Root
            className="color-slider__root"
            onValueChange={onSliderChange}
            min={min} max={max} step={step} value={[value]}>
            <Slider.Track className="color-slider__track"
                style={{ backgroundImage: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})` }}>
                <Slider.Range className="color-slider__range" />
            </Slider.Track>
            <Slider.Thumb className="color-slider__thumb" />
        </Slider.Root>
    </>)
}
