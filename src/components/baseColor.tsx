
import { colorAtom } from "~/lib/atoms";
import { useAtom } from "jotai";
import { colorFromString } from "~/lib/color";
import './baseColor.css'
import { useState } from "react";

export default function BaseColor() {
    const [color, setColor] = useAtom(colorAtom);
    const [color_string, setColorString] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const swatch_color = color.toString();

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


    return (
        <section className="base-color">
            <div className="base-color__swatch"
                style={{ backgroundColor: swatch_color }}>
            </div>
            <div className="base-color__input">
                <label htmlFor="swatch-color">Color (hex, rgb, or hsl)</label>
                <input type="text" name="swatch-color" id="swatch-color" value={color_string}
                    onChange={(e) => changeColor(e)} />
                <div className="base-color__error">{errorMsg}</div>
            </div>
            <div className="base-color__output">
                <div><strong>In HSL:</strong> {swatch_color}</div>
                <div><strong>In RGB:</strong> {color.toRGBString()}</div>
                <div><strong>In Hex:</strong> {color.toHexString()}</div>
            </div>
        </section>
    );
}
