import { useGlobalStore, TETRAD_SLIDER_INDEX } from "~/lib/globalStore";

import SwatchGroup from "~/components/swatchGroup";
import AngleSlider from "~/components/angleSlider";
import { tetradColors } from "~/lib/algorithms";

export default function Tetrad() {
    const {base_color, getAngle, setAngle} = useGlobalStore();

    const angle = getAngle(TETRAD_SLIDER_INDEX);

    function onAngleChange(angle: number) {
        setAngle(TETRAD_SLIDER_INDEX,angle);
    }

    const colors = tetradColors(base_color, angle);

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
                <AngleSlider onChange={onAngleChange} value={angle} min={10} max={170} />
            </div>
        </section>
    )
}
