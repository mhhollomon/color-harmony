import color from 'colorjs.io';

export class Color {
    clr : color;

    constructor(color_string : string)
    constructor(clr : color)
    constructor(input: string | color) {
        if (input instanceof color) {
            this.clr = input;
            return;
        }

        if (typeof input === 'string') {
            this.clr = new color(input);
            return;
        }

        throw new ColorException('Invalid color');
    }

    toString(): string {
        return this.clr.toString({'format': 'hsl'});
    }

    toFormatString(format: string): string {
        return this.clr.toString({'format': format});
    }

    lightness(): number {
        return this.clr.hsl.lightness ?? 0;
    }

    setLightness(lightness: number) : Color {
        const new_color = new color(this.clr);
        new_color.hsl.lightness = lightness;
        return new Color(new_color);
    }


    updateLightness(delta: number) : Color {
        const lightness = this.clr.hsl.lightness ?? 0;
        return this.setLightness(lightness + delta);
    }

    hue(): number {
        return this.clr.hsl.hue ?? 0;
    }

    setHue(hue: number) : Color {
        if (hue < 0) {
            hue = 360 + hue;
        } else if (hue > 360) {
            hue = hue - 360;
        }

        const new_color = new color(this.clr);
        new_color.hsl.hue = hue;
        return new Color(new_color);
    }

    updateHue(delta: number) : Color {
        const hue = this.clr.hsl.hue ?? 0;
        return this.setHue(hue + delta);
    }

    saturation(): number {
        return this.clr.hsl.saturation ?? 0;
    }

    setSaturation(saturation: number) : Color {
        const new_color = new color(this.clr);
        new_color.hsl.saturation = saturation;
        return new Color(new_color);
    }

    updateSaturation(delta: number) : Color {
        const saturation = this.saturation();
        return this.setSaturation(saturation + delta);
    }

}

export class ColorException extends Error {}

