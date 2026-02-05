import {atom} from 'jotai'
import { Color } from './color'

export const colorAtom = atom<Color>(new Color(42, 0.72, 0.54))
