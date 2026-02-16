import { useGlobalStore, SPLIT_COMPLEMENTARY_SLIDER_INDEX } from "~/lib/globalStore";
import SwatchGroup from "~/components/swatchGroup";
import AngleSlider from "~/components/angleSlider";
import { splitComplementaryColors } from "~/lib/algorithms";


export default function SplitComplementary() {
    const {base_color, getAngle, setAngle} = useGlobalStore();

    const offset = getAngle(SPLIT_COMPLEMENTARY_SLIDER_INDEX);

    function onAngleChange(angle: number) {
        setAngle(SPLIT_COMPLEMENTARY_SLIDER_INDEX,angle);
    }

    const colors = splitComplementaryColors(base_color, offset);

    return (
        <section className="harmony">
            <h2 className="harmony__title">Split Complementary</h2>
            <div className="harmony__body">
                <div className="harmony__description">
                    <p>These are colors are on the opposite side of the color wheel, but offset much like analogous colors.</p>
                    <p>If you will, these are analogous colors to the true complement.</p>
                    <p>The slider allows you adjust how far the colors are from the true complement.</p>
                    <p>You can click on the color swatch to get the css values or to make it the base color.</p>
                </div>
                <SwatchGroup colors={colors} category="split-comp" />
                <AngleSlider onChange={onAngleChange} value={offset} min={10} max={90} />
            </div>
        </section>
    )
}
