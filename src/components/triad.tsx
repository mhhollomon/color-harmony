import { useAtomValue } from "jotai";
import { colorAtom } from "~/lib/atoms";

import SwatchGroup from "~/components/swatchGroup";

export default function Triad() {
    const color = useAtomValue(colorAtom);
    const offset = 120;

    const lower_color = color.setHue(color.h - offset);
    const higher_color = color.setHue(color.h + offset);

    const colors = [{color : lower_color}, {color : color, label : "Base"}, {color : higher_color}];
    return (
        <section className="harmony">
            <h2 className="harmony__title">Triadic</h2>
            <div className="harmony__body">
            <div className="harmony__description">
                <p>These colors are evenly spaced on the color wheel (120 degrees apart).</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <SwatchGroup colors={colors} category="triad" />
            </div>
        </section>
    )
}
