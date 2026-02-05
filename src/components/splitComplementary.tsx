import { useAtomValue } from "jotai";
import ColorSwatch from "~/components/colorSwatch";
import { colorAtom } from "~/lib/atoms";
import { range } from '~/lib/range';

import './splitComplementary.css'

export default function SplitComplementary() {
    const color = useAtomValue(colorAtom);
    const offset = 30;

    const lower_color = color.setHue(color.h + 180 - offset);
    const higher_color = color.setHue(color.h + 180 + offset);

    const colors = [lower_color, color, higher_color];
    return (
        <section className="split-comp">
            <div className="split-comp__description">
                <p>These are colors are on the opposite side of the color wheel, but offset much like analogous colors.</p>
                <p>If you will, these are analogous colors to the true complement.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <div className="split-comp__swatch-grid">
            {range(0, colors.length).map((i) => {
                const new_color = colors[i];
                return (
                <div className="split-comp__output" key={i}>
                    <ColorSwatch color={new_color} className="split-comp__swatch" key={`${i}-swatch`} index={`split-comp-${i}`}/>
                    <div className="split-comp__label"
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
