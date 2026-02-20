import { Slider } from "radix-ui";

import './colorSlider.css'

export type ColorSliderProps = {
    min: number,
    max: number,
    title: string,
    step?: number,
    value: number,
    onChange: (value: number) => void,
    gradientStops?: string[],
}

export default function ColorSlider({ min, max, value, step, title, onChange, gradientStops }: ColorSliderProps) {
    function onSliderChange(value: number[]) {
        console.log(`-- colorslider '${title}' changing to ${value[0]}`)
        onChange(value[0]);
    }
    let gradientString : string | undefined = undefined;
    if (gradientStops && gradientStops.length > 0) {
        gradientString = 'linear-gradient(to right,' + gradientStops.join(',') + ')';
    }

    console.log(`-- colorslider current value = ${value}`)
    return (<>
        <p className="color-slider__label">{title}</p>
        <Slider.Root
            className="color-slider__root"
            onValueChange={onSliderChange}
            min={min} max={max} step={step} value={[value]}>
            <Slider.Track className="color-slider__track"
                style={gradientString ?{ backgroundImage: gradientString } : {}}>
                <Slider.Range className="color-slider__range" />
            </Slider.Track>
            <Slider.Thumb className="color-slider__thumb" />
        </Slider.Root>
    </>)
}
