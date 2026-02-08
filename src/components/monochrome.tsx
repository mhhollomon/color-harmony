import { useGlobalStore } from "~/lib/globalStore";
import SwatchGroup from '~/components/swatchGroup';
import { monochromeColors } from "~/lib/algorithms";


export default function Monochrome() {
    const {base_color} = useGlobalStore();

    const colors = monochromeColors(base_color)


    return (
        <section className="harmony">
            <h2 className="harmony__title">Monochrome</h2>
            <div className="harmony__body">
                <div className="harmony__description">
                    <p>These are just lighter and/or darker versions of the base color.</p>
                    <p>The app tries to intelligently place the base color so that
                        the monochrome scale has room for contrast.
                    </p>
                    <p>You can click on the color swatch to grab the css values.</p>
                </div>
                <SwatchGroup colors={colors} category="monochrome" />
            </div>
        </section>
    )
}
