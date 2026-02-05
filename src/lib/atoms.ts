import {atom} from 'jotai'
import { Color } from './color'

export const colorAtom = atom<Color>(new Color(0, 0, 0))
