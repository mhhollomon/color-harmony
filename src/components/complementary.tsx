import { useAtomValue } from "jotai";
import ColorSwatch from "~/components/colorSwatch";
import { colorAtom } from "~/lib/atoms";
import { range } from '~/lib/range';

import './complementary.css'

export default function Complementary() {
    const color = useAtomValue(colorAtom);
    const offset = 180;

    const complementary_color = color.setHue(color.h - offset);

    const colors = [color, complementary_color];
    return (
        <section className="complementary">
            <div className="complementary__description">
                <p>This is the color that is exactly opposite of the base color on the color wheel.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <div className="complementary__swatch-grid">
            {range(0, colors.length).map((i) => {
                const new_color = colors[i];
                return (
                <div className="complementary__output" key={i}>
                    <ColorSwatch color={new_color} className="complementary__swatch" key={`${i}-swatch`} index={`complementary-${i}`}/>
                    <div className="complementary__label"
                        key={`${i}-label`}
                        >
                        {i == 0 ? "Base" : " "}
                    </div>
                </div>
            )})}
            </div>
        </section>
    )
}
