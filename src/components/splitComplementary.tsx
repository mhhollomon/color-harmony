import { useAtomValue } from "jotai";
import { colorAtom } from "~/lib/atoms";
import SwatchGroup from "~/components/swatchGroup";


export default function SplitComplementary() {
    const color = useAtomValue(colorAtom);
    const offset = 30;

    const lower_color = color.setHue(color.h + 180 - offset);
    const higher_color = color.setHue(color.h + 180 + offset);

    const colors = [{color : lower_color}, {color : color, label : "Base"}, {color : higher_color}];
    return (
        <section className="harmony">
            <div className="harmony__description">
                <p>These are colors are on the opposite side of the color wheel, but offset much like analogous colors.</p>
                <p>If you will, these are analogous colors to the true complement.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <SwatchGroup colors={colors} category="split-comp" />
        </section>
    )
}
