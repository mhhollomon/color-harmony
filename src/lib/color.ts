import color from 'colorjs.io';

export class Color {
    clr : color;

    constructor(color_string : string)
    constructor(clr : color)
    constructor(input: string | color) {
        if (input instanceof color) {
            this.clr = input.to('hsl', {inGamut: true});
            return;
        }

        if (typeof input === 'string') {
            this.clr = (new color(input)).to('hsl', {inGamut: true});
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
        const l = this.clr.to('hsl', {inGamut: true}).hsl.lightness ?? 0;
        console.log(`-- color -- returning lightness: ${l}`);
        return l;
    }

    setLightness(lightness: number) : Color {
        const new_color = new color(this.clr.to('hsl'));
        new_color.hsl.lightness = lightness;
        return new Color(new_color);
    }


    updateLightness(delta: number) : Color {
        return this.setLightness(this.lightness() + delta);
    }

    hue(): number {
        const h = this.clr.to('hsl').hsl.hue ?? 0;
        console.log(`-- color -- returning hue: ${h}`);
        return h;
    }

    setHue(hue: number) : Color {
        if (hue < 0) {
            hue = 360 + hue;
        } else if (hue > 360) {
            hue = hue - 360;
        }

        const new_color = new color(this.clr.to('hsl'));
        new_color.hsl.hue = hue;
        return new Color(new_color);
    }

    updateHue(delta: number) : Color {
        return this.setHue(this.hue() + delta);
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

