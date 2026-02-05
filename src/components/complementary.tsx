import { useAtomValue } from "jotai";
import { colorAtom } from "~/lib/atoms";
import SwatchGroup from "~/components/swatchGroup";

export default function Complementary() {
    const color = useAtomValue(colorAtom);
    const offset = 180;

    const complementary_color = color.setHue(color.h - offset);

    const colors = [{color : color, label : "Base"}, {color:complementary_color}];
    return (
        <section className="harmony">
            <div className="harmony__description">
                <p>This is the color that is exactly opposite of the base color on the color wheel.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <SwatchGroup colors={colors} category="complementary" />
        </section>
    )
}
