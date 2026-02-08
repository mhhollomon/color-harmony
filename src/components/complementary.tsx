import { useGlobalStore, COMPLEMENTARY_SLIDER_INDEX } from "~/lib/globalStore";
import SwatchGroup from "~/components/swatchGroup";
import AngleSlider from "~/components/angleSlider";
import { complementaryColors } from "~/lib/algorithms";

export default function Complementary() {
    const {base_color, getAngle, setAngle} = useGlobalStore();

    function onAngleChange(angle: number) {
        setAngle(COMPLEMENTARY_SLIDER_INDEX,angle - 40);
    }

    const offset = getAngle(COMPLEMENTARY_SLIDER_INDEX);
    const colors = complementaryColors(base_color, offset);

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
