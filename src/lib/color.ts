import color from 'colorjs.io';

export class Color {
    h: number;
    s: number;
    l: number;

    clr : color;

    constructor(h: number, s: number, l: number)
    constructor(color_string : string)
    constructor(h: number | string, s?: number, l?: number) {
        if (typeof h === 'string') {
            this.clr = new color(h);
            this.h = this.clr.hsl.hue ?? 0;
            this.s = this.clr.hsl.saturation ?? 0;
            this.l = this.clr.hsl.lightness ?? 0;
            return;
        }

        if (s === undefined || l === undefined) {
            throw new Error("hsl constructor requires 3 parameters");
        }
        this.h = h;
        this.s = s;
        this.l = l;
        const hn = Math.round(this.h);
        const sn = Math.round(this.s * 100);
        const ln = Math.round(this.l * 100);
        const str =  `hsl(${hn}, ${sn}%, ${ln}%)`;

        this.clr = new color(str);
    }

    toString(): string {
        return this.clr.toString({'format': 'hsl'});
    }

    toHSLString(): string {
        return this.toString();
    }

    toRGBString(): string {
        return this.clr.toString({'format': 'rgb'});
    }

    toHexString(): string {
        return this.clr.toString({'format': 'hex'});
    }

    toBase64(): string {
        const compact = this.toCompactString();

        const base64 = btoa(compact)
            .replace(/\+/g, '-') // Replace '+' with '-'
            .replace(/\//g, '_') // Replace '/' with '_'
            .replace(/=+$/, ''); // Remove trailing '=' padding
        return base64;
    }

    toCompactString(): string {
        const h = Math.round(this.h);
        const s = Math.round(this.s * 100);
        const l = Math.round(this.l * 100);
        return `${h},${s},${l}`;
    }

    toFormatString(format: string): string {
        return this.clr.toString({'format': format});
    }

    setLightness(lightness: number) : Color {

        if (lightness < 0) {
            lightness = 0;
        }
        if (lightness > 1) {
            lightness = 1;
        }
        return new Color(this.h, this.s, lightness);

    }


    updateLightness(delta: number) : Color {
        return this.setLightness(this.l + delta);
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

    updateHue(delta: number) : Color {
        return this.setHue(this.h + delta);
    }

    setSaturation(saturation: number) : Color {
        if (saturation < 0) {
            saturation = 0;
        }
        if (saturation > 1) {
            saturation = 1;
        }
        return new Color(this.h, saturation, this.l);
    }

    updateSaturation(delta: number) : Color {
        return this.setSaturation(this.s + delta);
    }

}

export class ColorException extends Error {}

/************* */


export function colorFromString(color_string: string): Color {

    console.log(`--- input color_string: ${color_string}`);
    color_string = color_string.trim();
    return new Color(color_string);

}

export function colorFromBase64(base64: string): Color {

    base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }

    const [h, s, l] = atob(base64)
        .split(',')
        .map((s) => parseInt(s, 10));
    return new Color(h, s / 100, l / 100);
}

export function colorFromCompactString(compact_string: string): Color {

    const [h, s, l] = compact_string.split(',').map((s) => parseInt(s, 10));
    return new Color(h, s / 100, l / 100);
}
