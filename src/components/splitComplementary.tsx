import { useAtomValue } from "jotai";
import { colorAtom } from "~/lib/atoms";
import SwatchGroup from "~/components/swatchGroup";
import AngleSlider from "~/components/angleSlider";
import { useState } from "react";


export default function SplitComplementary() {
    const color = useAtomValue(colorAtom);
    const [offset, setOffset] = useState(30);

    function onAngleChange(angle: number) {
        setOffset(angle);
    }


    const lower_color = color.setHue(color.h + 180 - offset);
    const higher_color = color.setHue(color.h + 180 + offset);

    const colors = [{ color: lower_color }, { color: color, label: "Base" }, { color: higher_color }];
    return (
        <section className="harmony">
            <h2 className="harmony__title">Split Complementary</h2>
            <div className="harmony__body">
                <div className="harmony__description">
                    <p>These are colors are on the opposite side of the color wheel, but offset much like analogous colors.</p>
                    <p>If you will, these are analogous colors to the true complement.</p>
                    <p>The slider allows you adjust how far the colors are from the true complement.</p>
                    <p>You can click on the color swatch to grab the css values.</p>
                </div>
                <SwatchGroup colors={colors} category="split-comp" />
                <AngleSlider onChange={onAngleChange} value={offset} min={10} max={90} />
            </div>
        </section>
    )
}
