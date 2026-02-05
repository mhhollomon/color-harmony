import { useAtomValue } from "jotai";
import ColorSwatch from "~/components/colorSwatch";
import { colorAtom } from "~/lib/atoms";
import { range } from '~/lib/range';

import './triad.css'

export default function Triad() {
    const color = useAtomValue(colorAtom);
    const offset = 120;

    const lower_color = color.setHue(color.h - offset);
    const higher_color = color.setHue(color.h + offset);

    const colors = [lower_color, color, higher_color];
    return (
        <section className="triad">
            <div className="triad__description">
                <p>These are colors are evenly spaced on the color wheel.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <div className="triad__swatch-grid">
            {range(0, colors.length).map((i) => {
                const new_color = colors[i];
                return (
                <div className="triad__output" key={i}>
                    <ColorSwatch color={new_color} className="triad__swatch" key={`${i}-swatch`} index={`triad-${i}`}/>
                    <div className="triad__label"
                        key={`${i}-label`}
                        >
                        {i == 1 ? "Base" : " "}
                    </div>
                </div>
            )})}
            </div>
        </section>
    )
}
