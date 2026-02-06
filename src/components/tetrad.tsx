import { useAtomValue } from "jotai";
import { colorAtom } from "~/lib/atoms";

import SwatchGroup from "~/components/swatchGroup";
import { useState } from "react";
import AngleSlider from "~/components/angleSlider";

export default function Tetrad() {
    const color = useAtomValue(colorAtom);
    const [offset, setOffset] = useState(90);

    function onAngleChange(angle: number) {
        setOffset(angle);
    }

    const base_complement = color.setHue(color.h - 180);
    const other_color = color.setHue(color.h + offset);
    const other_complement = color.setHue(color.h + offset - 180);

    const colors = [
        { color: color, label: "Base" }, { color: base_complement },
        { color: other_color, label: "Second" }, { color: other_complement }];

    return (
        <section className="harmony">
            <h2 className="harmony__title">Tetradic</h2>
            <div className="harmony__body">
                <div className="harmony__description">
                    <p>These are colors two sets of complementary colors.</p>
                    <p>The slider allows you adjust how far the secondary color is from the base color.</p>
                    <p>You can click on the color swatch to grab the css values.</p>
                </div>
                <SwatchGroup colors={colors} category="tetrad" />
                <AngleSlider onChange={onAngleChange} value={offset} min={10} max={170} />
            </div>
        </section>
    )
}
