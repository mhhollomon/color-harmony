import { useAtomValue } from "jotai";
import ColorSwatch from "~/components/colorSwatch";
import { colorAtom } from "~/lib/atoms";
import { range } from '~/lib/range';

import './analogous.css'

export default function Analogous() {
    const color = useAtomValue(colorAtom);
    const offset = 60;

    const lower_color = color.setHue(color.h - offset);
    const higher_color = color.setHue(color.h + offset);

    const colors = [lower_color, color, higher_color];
    return (
        <section className="analogous">
            <div className="analogous__description">
                <p>These are colors that are "close" to the base color on the color wheel.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <div className="analogous__swatch-grid">
            {range(0, colors.length).map((i) => {
                const new_color = colors[i];
                return (
                <div className="analogous__output" key={i}>
                    <ColorSwatch color={new_color} className="analogous__swatch" key={`${i}-swatch`} index={`analogous-${i}`}/>
                    <div className="analogous__label"
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
