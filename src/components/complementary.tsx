import { useAtomValue } from "jotai";
import { colorAtom } from "~/lib/atoms";
import SwatchGroup from "~/components/swatchGroup";
import { useState } from "react";
import AngleSlider from "~/components/angleSlider";

export default function Complementary() {
    const color = useAtomValue(colorAtom);
    const [offset, setOffset] = useState(0);

    function onAngleChange(angle: number) {
        setOffset(angle - 40);
    }

    const complementary_color = color.setHue(color.h - 180 + offset);

    const colors = [{color : color, label : "Base"}, {color:complementary_color}];
    return (
        <section className="harmony">
            <div className="harmony__description">
                <p>This is the color that is opposite of the base color on the color wheel.</p>
                <p>The slider allows you adjust how far the color is from truly "opposite".</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <SwatchGroup colors={colors} category="complementary" />
            <AngleSlider onChange={onAngleChange} value={offset+40} display={offset} min={0} max={80} />

        </section>
    )
}
