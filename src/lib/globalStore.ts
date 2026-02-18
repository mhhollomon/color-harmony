import { create } from "zustand";
import { Color } from "~/lib/color"

export interface GlobalStoreType {
    base_color: Color
    setBaseColor: (color: Color) => void

    angles: number[]
    getAngle: (index: number) => number
    setAngle: (index: number, angle: number) => void

    lastParam: string
    toSearchParam: () => string
    fromSearchParam: (search: string) => void

    history: Color[]
    historyIndex: number
    addToHistory: (color: Color) => void
    undo: () => void
    redo: () => void
    resetHistory: () => void
    canUndo: () => boolean
    canRedo: () => boolean


}

export const ANALOGOUS_SLIDER_INDEX = 0;
export const ANALOGOUS_DEFAULT_ANGLE = 40;

export const COMPLEMENTARY_SLIDER_INDEX = 1;
export const COMPLEMENTARY_DEFAULT_ANGLE = 0;

export const SPLIT_COMPLEMENTARY_SLIDER_INDEX = 2;
export const SPLIT_COMPLEMENTARY_DEFAULT_ANGLE = 30;

export const TETRAD_SLIDER_INDEX = 3;
export const TETRAD_DEFAULT_ANGLE = 90;

const startingColorString = 'hsl(42, 72, 54)'


export const useGlobalStore = create<GlobalStoreType>((set, get) => ({
    base_color: new Color(startingColorString),
    angles: [
        ANALOGOUS_DEFAULT_ANGLE,
        COMPLEMENTARY_DEFAULT_ANGLE,
        SPLIT_COMPLEMENTARY_DEFAULT_ANGLE,
        TETRAD_DEFAULT_ANGLE
    ],
    history: [new Color(startingColorString)],
    historyIndex: 1,

    lastParam: '',

    addToHistory: (color: Color) => {
        console.log(`-- adding ${color.toString()} to history (index ${get().historyIndex})`);
        set(state => ({ history: [...state.history.slice(0, state.historyIndex), color], historyIndex: state.historyIndex + 1 }))
    },

    undo: () => {
        if (get().historyIndex > 1) {
            const color = get().history[get().historyIndex - 2];
            console.log(`-- undoing to ${color.toString()} (index ${get().historyIndex - 1})`);
            set(state => ({ base_color: color, historyIndex: state.historyIndex - 1 }))
        } else {
            console.log("-- Can't undo");
        }
    },
    redo: () => {
        if (get().historyIndex < get().history.length) {
            const color = get().history[get().historyIndex];
            console.log(`-- redoing to ${color.toString()} (index ${get().historyIndex})`);
            set(state => ({ base_color: color, historyIndex: state.historyIndex + 1 }))
        } else {
            console.log("-- Can't redo");
        }
    },
    resetHistory: () => {
        const lastParam = get().lastParam;
        if (lastParam !== '') {
            get().fromSearchParam(get().lastParam);
        } else {
            const new_color = new Color(startingColorString);
            set({
                base_color: new_color,
                angles: [
                    ANALOGOUS_DEFAULT_ANGLE,
                    COMPLEMENTARY_DEFAULT_ANGLE,
                    SPLIT_COMPLEMENTARY_DEFAULT_ANGLE,
                    TETRAD_DEFAULT_ANGLE
                ],
                history: [new_color],
                historyIndex: 1,

                lastParam: '',
            })
        }
    },

    canUndo: () => get().historyIndex > 1,
    canRedo: () => get().historyIndex < get().history.length,

    setBaseColor: (color: Color) => {
        set({ base_color: color })
        get().addToHistory(color);
    },

    getAngle: (index: number) => get().angles[index],
    setAngle: (index: number, angle: number) => set(state => ({ angles: state.angles.map((a, i) => i === index ? angle : a) })),

    toSearchParam: () => {
        const color = get().base_color.toString();
        const angles = get().angles;

        let retval = `${color}:${angles[0]}:${angles[1]}:${angles[2]}:${angles[3]}`;

        retval = btoa(retval)
            .replace(/\+/g, '-') // Replace '+' with '-'
            .replace(/\//g, '_') // Replace '/' with '_'
            .replace(/=+$/, ''); // Remove trailing '=' padding
        return retval;
    },

    fromSearchParam: (param: string) => {
        let updated_param = param.replace(/-/g, '+').replace(/_/g, '/');
        while (updated_param.length % 4 !== 0) {
            updated_param += '=';
        }

        const [color, a0, a1, a2, a3] = atob(param)
            .split(':');
        const new_color = new Color(color);
        const angles = [parseInt(a0, 10), parseInt(a1, 10), parseInt(a2, 10), parseInt(a3, 10)];
        set({
            base_color: new_color,
            angles: angles,
            lastParam: param,
            historyIndex: 1,
            history: [new_color]
        });
    }
}));
