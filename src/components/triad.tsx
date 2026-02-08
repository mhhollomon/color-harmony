import { useGlobalStore } from "~/lib/globalStore";

import SwatchGroup from "~/components/swatchGroup";

export default function Triad() {
    const {base_color} = useGlobalStore();
    const offset = 120;

    const lower_color = base_color.updateHue(- offset);
    const higher_color = base_color.setHue(offset);

    const colors = [{color : lower_color}, {color : base_color, label : "Base"}, {color : higher_color}];
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
