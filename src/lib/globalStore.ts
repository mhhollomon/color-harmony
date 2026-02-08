import { create } from "zustand";
import { Color } from "~/lib/color"

export interface GlobalStoreType {
    base_color : Color
    setBaseColor : (color : Color) => void

    angles : number[]
    getAngle : (index: number) => number
    setAngle : (index: number, angle : number) => void
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
    base_color : new Color(42, 0.72, 0.54),
    angles : [
        ANALOGOUS_DEFAULT_ANGLE,
        COMPLEMENTARY_DEFAULT_ANGLE,
        SPLIT_COMPLEMENTARY_DEFAULT_ANGLE,
        TETRAD_DEFAULT_ANGLE
    ],

    setBaseColor : (color : Color) => set({ base_color: color }),

    getAngle : (index: number) => get().angles[index],
    setAngle : (index: number, angle : number) => set(state => ({ angles: state.angles.map((a, i) => i === index ? angle : a) }))

}));
