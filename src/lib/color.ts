export class Color {
    h: number;
    s: number;
    l: number;

    constructor(h: number, s: number, l: number) {
        this.h = h;
        this.s = s;
        this.l = l;
    }

    toString(): string {
        const h = Math.round(this.h);
        const s = Math.round(this.s * 100);
        const l = Math.round(this.l * 100);
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    toHSLString(): string {
        return this.toString();
    }

    toRGBString(): string {
        const [r, g, b] = hslToRGB(this.h, this.s, this.l);
        return `rgb(${r}, ${g}, ${b})`;
    }

    toHexString(): string {
        const [r, g, b] = hslToRGB(this.h, this.s, this.l);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
    }

    setLightness(lightness: number) : Color {
        return new Color(this.h, this.s, lightness);

    }

    setHue(hue: number) : Color {
        if (hue < 0) {
            hue += 360;
        }
        if (hue > 360) {
            hue -= 360;
        }
        return new Color(hue, this.s, this.l);
    }

}

export class ColorException extends Error {}

/************* */


export function colorFromString(color_string: string): Color {

    console.log(`--- input color_string: ${color_string}`);
    color_string = color_string.trim();
    if (color_string.startsWith("#")) {
        return _colorFromHexString(color_string.substring(1));
    } else if (color_string.startsWith("rgb")) {
        return _colorFromRGBString(color_string);
    }else if (color_string.startsWith("hsl")) {
        return _colorFromHSLString(color_string);
    }

    throw new ColorException(`Unrecognized color string`);

}


function _colorFromHexString(hex: string): Color {

    if (hex.length !== 6) {
        throw new ColorException(`Hex string must be 6 characters long`);
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return _colorFromRGB(r, g, b);
}

function _parseIntParam(param: string, name : string): number {
    if (!/^\d+$/.test(param)) {
        throw new ColorException(`${name} must only contain digits`);
    }
    return parseInt(param, 10);

}

function _parseFloatParam(param: string, name : string, allow_percent : boolean= true): number {
    if (!/^\d+(\.\d+)?\%?$/.test(param)) {
        throw new ColorException(`${name} must only contain a number`);
    }

    let value =  parseFloat(param);
    if (param.endsWith("%")) {
        if (!allow_percent) {
            throw new ColorException(`${name} must not end with %`);
        }
        value /= 100;
    }

    return value;
}

function _colorFromRGBString(rgb_string: string): Color {

    if (!rgb_string.startsWith("rgb") || !rgb_string.endsWith(")")) {
        throw new ColorException(`rgb string must have closing parenthesis`);
    }

    const rgb = rgb_string.substring(4, rgb_string.length - 1).split(/,\s*/);
    if (rgb.length !== 3) {
        throw new ColorException(`rgb string must have 3 values`);
    }
    const r = _parseIntParam(rgb[0], "rgb values");
    const g = _parseIntParam(rgb[1], "rgb values");
    const b = _parseIntParam(rgb[2], "rgb values");
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new ColorException(`rgb values must be between 0 and 255`);
    }
    return _colorFromRGB(r, g, b);
}

function _colorFromHSLString(hsl_string: string): Color {

    if (!hsl_string.startsWith("hsl") || !hsl_string.endsWith(")")) {
        throw new ColorException(`hsl string must have closing parenthesis`);
    }
    const hsl = hsl_string.substring(4, hsl_string.length - 1).split(/,\s*/);
    if (hsl.length !== 3) {
        throw new ColorException(`hsl string must have 3 values`);
    }

    const h = _parseFloatParam(hsl[0], "hsl values", false);
    if (h < 0 || h > 360) {
        throw new ColorException(`hue values must be between 0 and 360`);
    }
    const s = _parseFloatParam(hsl[1], "hsl values");
    if (s < 0 || s > 1) {
        throw new ColorException(`saturation values must be between 0 and 1 (or 0-100%)`);
    }
    const l = _parseFloatParam(hsl[2], "hsl values");
    if (l < 0 || l > 1) {
        throw new ColorException(`lightness values must be between 0 and 1 (or 0-100%)`);
    }
    return new Color(h, s, l);
}

function _colorFromRGB(r: number, g: number, b: number): Color {
    const hsl = rgbToHsl(r, g, b);
    return new Color(hsl[0], hsl[1], hsl[2]);
}

function rgbToHsl(r: number, g: number, b: number): number[] {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const l = (max + min) / 2;
    if (delta === 0) {
        return [0, 0, l];
    }
    const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    let h = 0;
    if (max === r) {
        h = ((g - b) / delta) % 6.0;
    }
    if (max === g) {
        h = 2 + (b - r) / delta;
    }
    if (max === b) {
        h = 4 + (r - g) / delta;
    }
    h *= 60;
    if (h < 0) {
        h += 360;
    }
    return [h, s, l];
}

/*
* h = hue (0-360)
* s = saturation (0-1)
* l = lightness (0-1)
*
* returns [r, g, b] in range 0-255
*/
function hslToRGB(h: number, s: number, l: number): number[] {
    h = h / 360;
    let r = 0;
    let g = 0;
    let b = 0;

    if (s == 0) {
        r = g = b = Math.round(l * 255);
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
        g = Math.round(hue2rgb(p, q, h) * 255);
        b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
    }
    return [r, g, b];
}
