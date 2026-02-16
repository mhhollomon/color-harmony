import { useGlobalStore, ANALOGOUS_SLIDER_INDEX } from "~/lib/globalStore";

import SwatchGroup from "~/components/swatchGroup";
import AngleSlider from "~/components/angleSlider";
import { analogousColors } from "~/lib/algorithms";


export default function Analogous() {
    const {base_color, getAngle, setAngle} = useGlobalStore();

    function onAngleChange(angle: number) {
        setAngle(ANALOGOUS_SLIDER_INDEX,angle);
    }

    const angle = getAngle(ANALOGOUS_SLIDER_INDEX);

    const colors = analogousColors(base_color, angle);

    return (
        <section className="harmony">
            <h2 className="harmony__title">Analogous</h2>
            <div className="harmony__body">
            <div className="harmony__description">
                <p>These are colors that are "close" to the base color on the color wheel.</p>
                <p>The slider allows you adjust how far the colors are from the base color.</p>
                <p>You can click on the color swatch to get the css values or to make it the base color.</p>
            </div>
            <SwatchGroup colors={colors} category="analogous" />
            <AngleSlider onChange={onAngleChange} value={angle} min={30} max={90} />
            </div>
        </section>
    )
}
