import {atom} from 'jotai'
import { Color } from './color'

export const colorAtom = atom<Color>(new Color('hsl(42, 72%, 54%)'));
