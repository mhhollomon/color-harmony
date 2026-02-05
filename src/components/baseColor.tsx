
import { colorAtom } from "~/lib/atoms";
import { useAtom } from "jotai";
import { colorFromString } from "~/lib/color";
import './baseColor.css'
import { useEffect, useState } from "react";
import ColorSwatch from "~/components/colorSwatch";

export default function BaseColor() {
    const [color, setColor] = useAtom(colorAtom);
    const [color_string, setColorString] = useState<string>(color.toString());
    const [errorMsg, setErrorMsg] = useState("");

    console.log(`color: ${color}`);

    function changeColor(e : React.ChangeEvent<HTMLInputElement>) {
        setColorString(e.target.value);
        try {
            const new_color = colorFromString(e.target.value);
            setColor(new_color);
            setErrorMsg("");
            const hex = new_color.toHexString();
            window.location.hash = hex;
        } catch (err) {
            console.log(err);
            setErrorMsg((err as Error).message);
        }
    }

    useEffect(() => {
        /* make sure our string matches the current color on mount */
        setColorString(color.toString());
    }, [color]);


    return (
        <section className="base-color">
            <div className="base-color__description">
                <p>Enter a color in hex, rgb, or hsl format.</p>
                <p>For example: <code>#ff0000</code> , <code>rgb(255, 0, 0)</code>, or <code>hsl(0, 100%, 50%)</code>.</p>
                <p>This color will be used as the base to create the color harmonies.</p>
                <p>You can click on the color swatch to grab the css values.</p>
            </div>
            <div className="base-color__grid">
            <ColorSwatch color={color} className="base-color__swatch" index="base-color"/>
            <div className="base-color__input">
                <label htmlFor="swatch-color">Color (hex, rgb, or hsl)</label>
                <input type="text" name="swatch-color" id="swatch-color" value={color_string}
                    onChange={(e) => changeColor(e)} />
                <div className="base-color__error">{errorMsg}</div>
            </div>
            </div>
        </section>
    );
}
