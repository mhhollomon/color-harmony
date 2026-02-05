import { useAtomValue } from 'jotai';
import { colorAtom } from '~/lib/atoms';
import SwatchGroup, { type SwatchDatum } from '~/components/swatchGroup';

import { range } from '~/lib/range';

const COUNT = 5;
const MAX_L = 0.9
const MIN_L = 0.1

export default function Monochrome() {
    const color = useAtomValue(colorAtom);

    let colors : SwatchDatum[] = [];
    let base_index = 0;

    if (color.l > 2/3) {
        // Base is light so put it at the start and work towards dark
        const increment = (color.l - MIN_L) / (COUNT - 1);
        base_index = 0;
        colors = range(0, COUNT).map((i) => {return {color : color.setLightness(color.l - i * increment)}});

    } else if (color.l < 1/3) {
        // Base is dark so put it at the end and work towards light
        const increment = (MAX_L - color.l) / (COUNT - 1);
        base_index = COUNT - 1;
        colors = range(0, COUNT).map((i) => {return {color : color.setLightness(MAX_L - i * increment)}});

    } else {
        /* This is the complicated case since we need to do things
         * on both sides
         */
        base_index = Math.floor(COUNT / 2);
        console.log(`--- base_index: ${base_index}`);
        const light_inc = (MAX_L-color.l) / base_index;
        const light_colors = range(0, base_index).map((i) => { return {color : color.setLightness(MAX_L - i * light_inc)}});

        const dark_dec = (color.l - MIN_L) / (COUNT - base_index-1);
        const dark_colors = range(0, COUNT-base_index).map((i) => { return {color : color.setLightness(color.l - i * dark_dec)}});
        colors = [...light_colors, ...dark_colors]
    }

    colors[base_index] = {color : color, label : "Base"}

    return (
        <section className="harmony">
            <div className="harmony__description">
                <p>These are just lighter and/or darker versions of the base color.</p>
                <p>The app tries to intelligently place the base color so that
                the monochrome scale has room for contrast.
                </p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <SwatchGroup colors={colors} category="monochrome" />
        </section>
    )
}
