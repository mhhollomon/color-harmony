import { range } from "~/lib/range";
import { Color } from "./color";
import { type SwatchDatum } from "~/lib/types/swatchDatum";

export function analogousColors(base_color: Color, offset : number) : SwatchDatum[] {
    const lower_color = base_color.updateHue(-offset);
    const higher_color = base_color.updateHue(offset);

    const colors = [{color : lower_color}, {color : base_color, label : "Base"}, {color : higher_color}];
    return colors;
}

export function complementaryColors(base_color: Color, offset : number) : SwatchDatum[] {
    const complementary_color = base_color.updateHue(-180 + offset);
    const colors = [{color : base_color, label : "Base"}, {color:complementary_color}];
    return colors;
}

export function splitComplementaryColors(base_color: Color, offset : number) : SwatchDatum[] {
    const lower_color = base_color.updateHue(180 - offset);
    const higher_color = base_color.updateHue(180 + offset);

    const colors = [{ color: lower_color }, { color: base_color, label: "Base" }, { color: higher_color }];
    return colors;

}

export function triadColors(base_color: Color, offset : number) : SwatchDatum[] {
    const lower_color = base_color.updateHue(- offset);
    const higher_color = base_color.updateHue(offset);

    const colors = [{color : lower_color}, {color : base_color, label : "Base"}, {color : higher_color}];

    return colors;
}

export function tetradColors(base_color: Color, offset : number) : SwatchDatum[] {
    const base_complement = base_color.updateHue(-180);
    const other_color = base_color.updateHue(offset);
    const other_complement = base_color.updateHue(offset - 180);

    const colors = [
        { color: base_color, label: "Base" }, { color: base_complement },
        { color: other_color, label: "Second" }, { color: other_complement }];

    return colors;
}

const COUNT = 5;
const MAX_L = 0.9 * 100;
const MIN_L = 0.1 * 100;

const UPPER_BOUND = (200/3); /* 2/3 expressed as a % */
const LOWER_BOUND = (100/3); /* 1/3 expressed as a % */

export function monochromeColors(base_color: Color) : SwatchDatum[] {
    let colors: SwatchDatum[] = [];
    let base_index = 0;

    const base_lightness = base_color.lightness();
    console.log(`--- monochrome lightness: ${base_lightness}`);

    if (base_lightness > UPPER_BOUND) {
        // Base is light so put it at the start and work towards dark
        const increment = (base_lightness - MIN_L) / (COUNT - 1);
        base_index = 0;
        colors = range(0, COUNT).map((i) => { return { color: base_color.setLightness(base_lightness - i * increment) } });

    } else if (base_lightness < LOWER_BOUND) {
        // Base is dark so put it at the end and work towards light
        const increment = (MAX_L - base_lightness) / (COUNT - 1);
        base_index = COUNT - 1;
        colors = range(0, COUNT).map((i) => { return { color: base_color.setLightness(MAX_L - i * increment) } });

    } else {
        /* This is the complicated case since we need to do things
         * on both sides
         */
        base_index = Math.floor(COUNT / 2);
        console.log(`--- base_index: ${base_index}`);
        const light_inc = (MAX_L - base_lightness) / base_index;
        const light_colors = range(0, base_index).map((i) => { return { color: base_color.setLightness(MAX_L - i * light_inc) } });

        const dark_dec = (base_lightness - MIN_L) / (COUNT - base_index - 1);
        const dark_colors = range(0, COUNT - base_index).map((i) => { return { color: base_color.setLightness(base_lightness - i * dark_dec) } });
        colors = [...light_colors, ...dark_colors]
    }

    colors[base_index] = { color: base_color, label: "Base" }

    return colors
}


