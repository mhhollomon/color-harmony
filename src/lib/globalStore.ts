import { create } from "zustand";
import { Color } from "~/lib/color"

export interface GlobalStoreType {
    base_color : Color
    setBaseColor : (color : Color) => void

    angles : number[]
    getAngle : (index: number) => number
    setAngle : (index: number, angle : number) => void

    toSearchParm : () => string
    fromSearchParm : (search : string) => void
}

export const ANALOGOUS_SLIDER_INDEX = 0;
export const ANALOGOUS_DEFAULT_ANGLE = 40;

export const COMPLEMENTARY_SLIDER_INDEX = 1;
export const COMPLEMENTARY_DEFAULT_ANGLE = 0;

export const SPLIT_COMPLEMENTARY_SLIDER_INDEX = 2;
export const SPLIT_COMPLEMENTARY_DEFAULT_ANGLE = 30;

export const TETRAD_SLIDER_INDEX = 3;
export const TETRAD_DEFAULT_ANGLE = 90;


export const useGlobalStore = create<GlobalStoreType>((set, get) => ({
    base_color : new Color('hsl(42, 72, 54)'),
    angles : [
        ANALOGOUS_DEFAULT_ANGLE,
        COMPLEMENTARY_DEFAULT_ANGLE,
        SPLIT_COMPLEMENTARY_DEFAULT_ANGLE,
        TETRAD_DEFAULT_ANGLE
    ],

    setBaseColor : (color : Color) => set({ base_color: color }),

    getAngle : (index: number) => get().angles[index],
    setAngle : (index: number, angle : number) => set(state => ({ angles: state.angles.map((a, i) => i === index ? angle : a) })),

    toSearchParm : () => {
        const color = get().base_color.toString();
        const angles = get().angles;

        let retval = `${color}:${angles[0]}:${angles[1]}:${angles[2]}:${angles[3]}`;

        retval = btoa(retval)
            .replace(/\+/g, '-') // Replace '+' with '-'
            .replace(/\//g, '_') // Replace '/' with '_'
            .replace(/=+$/, ''); // Remove trailing '=' padding
        return retval;
    },

    fromSearchParm : (param : string) => {
        param = param.replace(/-/g, '+').replace(/_/g, '/');
        while (param.length % 4 !== 0) {
            param += '=';
        }

        const [color, a0, a1, a2, a3] = atob(param)
            .split(':');
        const angles = [parseInt(a0, 10), parseInt(a1, 10), parseInt(a2, 10), parseInt(a3, 10)];
        set({ base_color: new Color(color), angles : angles });
    }
}));
