import { Slider } from "radix-ui";

import './angleSlider.css'

export type AngleSliderProps = {
    min : number,
    max : number,
    step? : number,
    value : number,
    display? : number,
    onChange: (value : number) => void
}

export default function AngleSlider({min, max, value, display, step, onChange} : AngleSliderProps) {
    /***** NOTE
     * The slide compoment doesn't seem to handle negative values well.
     * (E.g. a range from -40 to 40 doesn't work)
     * So the parent will need to do a translation.
     *
     * @param display is the value that will shown in the UI.
     * @param value is the value that should be used in the slider.
     */
    function onSliderChange(value : number[]) {
        onChange(value[0]);
    }
    step ??= 5;
    display ??= value;
    return (<>
        <p className="SliderLabel">Angle: {display}</p>
        <Slider.Root
        className="SliderRoot"
        onValueChange={onSliderChange}
        min={min} max={max} step={step} defaultValue={[40]}>
            <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
            </Slider.Track>
            <Slider.Thumb className="SliderThumb" />
        </Slider.Root>
    </>)
}
