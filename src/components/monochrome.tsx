import { useGlobalStore } from "~/lib/globalStore";
import SwatchGroup, { type SwatchDatum } from '~/components/swatchGroup';

import { range } from '~/lib/range';

const COUNT = 5;
const MAX_L = 0.9
const MIN_L = 0.1

export default function Monochrome() {
    const {base_color} = useGlobalStore();

    let colors: SwatchDatum[] = [];
    let base_index = 0;

    if (base_color.l > 2 / 3) {
        // Base is light so put it at the start and work towards dark
        const increment = (base_color.l - MIN_L) / (COUNT - 1);
        base_index = 0;
        colors = range(0, COUNT).map((i) => { return { color: base_color.setLightness(base_color.l - i * increment) } });

    } else if (base_color.l < 1 / 3) {
        // Base is dark so put it at the end and work towards light
        const increment = (MAX_L - base_color.l) / (COUNT - 1);
        base_index = COUNT - 1;
        colors = range(0, COUNT).map((i) => { return { color: base_color.setLightness(MAX_L - i * increment) } });

    } else {
        /* This is the complicated case since we need to do things
         * on both sides
         */
        base_index = Math.floor(COUNT / 2);
        console.log(`--- base_index: ${base_index}`);
        const light_inc = (MAX_L - base_color.l) / base_index;
        const light_colors = range(0, base_index).map((i) => { return { color: base_color.setLightness(MAX_L - i * light_inc) } });

        const dark_dec = (base_color.l - MIN_L) / (COUNT - base_index - 1);
        const dark_colors = range(0, COUNT - base_index).map((i) => { return { color: base_color.setLightness(base_color.l - i * dark_dec) } });
        colors = [...light_colors, ...dark_colors]
    }

    colors[base_index] = { color: base_color, label: "Base" }

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
