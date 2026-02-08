import { create } from "zustand";
import { Color } from "~/lib/color"

export interface GlobalStoreType {
    base_color : Color
    setBaseColor : (color : Color) => void
}

export const useGlobalStore = create<GlobalStoreType>((set) => ({
    base_color : new Color(42, 0.72, 0.54),

    setBaseColor : (color : Color) => set({ base_color: color }),

}));
