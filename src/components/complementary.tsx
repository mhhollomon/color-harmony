import { useGlobalStore } from "~/lib/globalStore";
import SwatchGroup from "~/components/swatchGroup";
import { useState } from "react";
import AngleSlider from "~/components/angleSlider";

export default function Complementary() {
    const {base_color} = useGlobalStore();
    const [offset, setOffset] = useState(0);

    function onAngleChange(angle: number) {
        setOffset(angle - 40);
    }

    const complementary_color = base_color.updateHue(-180 + offset);

    const colors = [{color : base_color, label : "Base"}, {color:complementary_color}];
    return (
        <section className="harmony">
            <h2 className="harmony__title">Complementary</h2>
            <div className="harmony__body">
            <div className="harmony__description">
                <p>This is the color that is opposite of the base color on the color wheel.</p>
                <p>The slider allows you adjust how far the color is from truly "opposite".</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <SwatchGroup colors={colors} category="complementary" />
            <AngleSlider onChange={onAngleChange} value={offset+40} display={offset} min={0} max={80} />
            </div>

        </section>
    )
}
