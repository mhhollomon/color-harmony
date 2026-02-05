import { useAtomValue } from "jotai";
import { colorAtom } from "~/lib/atoms";

import SwatchGroup from "~/components/swatchGroup";
import AngleSlider from "~/components/angleSlider";
import { useState } from "react";


export default function Analogous() {
    const color = useAtomValue(colorAtom);
    const [angle, setAngle] = useState(40);

    function onAngleChange(angle: number) {
        setAngle(angle);
    }


    const lower_color = { color: color.setHue(color.h - angle) };
    const higher_color = { color: color.setHue(color.h + angle) };

    const colors = [lower_color, { color: color, label: "Base" }, higher_color];


    return (
        <section className="harmony">
            <div className="harmony__description">
                <p>These are colors that are "close" to the base color on the color wheel.</p>
                <p>The slider allows you adjust how far the colors are from the base color.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <SwatchGroup colors={colors} category="analogous" />
            <AngleSlider onChange={onAngleChange} value={angle} min={30} max={90} />
        </section>
    )
}
