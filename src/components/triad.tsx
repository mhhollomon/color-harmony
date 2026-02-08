import { useGlobalStore } from "~/lib/globalStore";

import SwatchGroup from "~/components/swatchGroup";
import { triadColors } from "~/lib/algorithms";

export default function Triad() {
    const {base_color} = useGlobalStore();
    const offset = 120;
    const colors = triadColors(base_color, offset);

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
