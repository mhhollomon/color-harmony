import { useAtomValue } from "jotai";
import { colorAtom } from "~/lib/atoms";

import SwatchGroup from "~/components/swatchGroup";


export default function Analogous() {
    const color = useAtomValue(colorAtom);
    const offset = 60;

    const lower_color = {color : color.setHue(color.h - offset)};
    const higher_color = {color : color.setHue(color.h + offset)};

    const colors = [lower_color, {color : color, label : "Base"}, higher_color];
    return (
        <section className="harmony">
            <div className="harmony__description">
                <p>These are colors that are "close" to the base color on the color wheel.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <SwatchGroup colors={colors} category="analogous" />
        </section>
    )
}
