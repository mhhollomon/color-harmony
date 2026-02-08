import { useGlobalStore } from "~/lib/globalStore";

import SwatchGroup from "~/components/swatchGroup";
import AngleSlider from "~/components/angleSlider";
import { useState } from "react";


export default function Analogous() {
    const {base_color} = useGlobalStore();
    const [angle, setAngle] = useState(40);

    function onAngleChange(angle: number) {
        setAngle(angle);
    }


    const lower_color = { color: base_color.updateHue(-angle) };
    const higher_color = { color: base_color.updateHue(angle) };

    const colors = [lower_color, { color: base_color, label: "Base" }, higher_color];


    return (
        <section className="harmony">
            <h2 className="harmony__title">Analogous</h2>
            <div className="harmony__body">
            <div className="harmony__description">
                <p>These are colors that are "close" to the base color on the color wheel.</p>
                <p>The slider allows you adjust how far the colors are from the base color.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <SwatchGroup colors={colors} category="analogous" />
            <AngleSlider onChange={onAngleChange} value={angle} min={30} max={90} />
            </div>
        </section>
    )
}
