import color from 'colorjs.io';
import { useEffect, useRef, useState } from "react";
import { useGlobalStore } from "~/lib/globalStore";
import './colorDialog.css'
import { Color } from "~/lib/color";
import { x_large } from '~/lib/icons';
import ColorSwatch from '~/components/colorSwatch';
import ColorSlider from './colorSlider';

export interface ColorDialogProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export default function ColorDialog({ isOpen, setIsOpen }: ColorDialogProps) {
    const [colorString, setColorString] = useState('#000000');
    const { base_color, setBaseColor } = useGlobalStore();
    const [currentColor, setCurrentColor] = useState(new color(base_color.toString()));
    const [errorMsg, setErrorMsg] = useState('');
    const dialogRef = useRef<HTMLDialogElement>(null);


    function handleSave() {
        setCurrentColor(new color(colorString));
        setBaseColor(new Color(currentColor));
        setIsOpen(false);
    }
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setColorString(e.target.value);
        try {
            setCurrentColor(new color(e.target.value));
            setErrorMsg('');
        } catch (err) {
            console.log(err);
            setErrorMsg((err as Error).message);
        }
    }
    function onColorSliderChange(value: number, type: string, channel: string) {
        console.log(`-- onColorSliderChange value = ${value} type = ${type} channel = ${channel}`)
        const new_color = new color(currentColor)
        if (type === 'rgb') {
            switch (channel) {
                case 'red':
                    new_color.srgb.red = value / 255;
                    break;

                case 'blue':
                    new_color.srgb.blue = value / 255;
                    break;
                case 'green' :
                    new_color.srgb.green = value / 255;
                    break
                default:
                    throw Error(`unkown channel '${channel} for type ${type}`)
            }
        }
        setCurrentColor(new_color);
        setColorString(new_color.toString());


    }

    useEffect(() => {
        setColorString(base_color.toString());
    }, [base_color]);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
            setColorString(base_color.toString());
            setCurrentColor(new color(base_color.toString()));
            setErrorMsg('');

        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);


    return (<>
        {/* Need the onClose to capture when 'esc' is pressed (rather than the close button). */}
        <dialog className="color-dialog" ref={dialogRef} onClose={() => setIsOpen(false)}>
            <header className='color-dialog__header'>Set Color
                <button onClick={() => setIsOpen(false)}>{x_large}</button>
            </header>
            <div className="color-dialog__content">

                <ColorSwatch color={new Color(currentColor)} className="color-dialog__color-swatch" index="dialog"
                    focusAction={false} infoAction={false}
                />
                <div>
                    <label htmlFor="color-string">Color</label>
                    <input type="text" value={colorString} id="color-string" onChange={onChange} />
                    {errorMsg ? <p className="color-dialog__error">{errorMsg}</p> : null}
                    <button onClick={handleSave}>Save</button>
                </div>
                <ColorSlider min={0} max={255} title="Red"
                    value={Math.floor((currentColor.srgb.red ?? 0) * 255)}
                    onChange={(value) => { onColorSliderChange(value, 'rgb', 'red') }} />
                <ColorSlider min={0} max={255} title="Green"
                    value={Math.floor((currentColor.srgb.green ?? 0) * 255)}
                    onChange={(value) => { onColorSliderChange(value, 'rgb', 'green') }} />
                <ColorSlider min={0} max={255} title="Blue"
                    value={Math.floor((currentColor.srgb.blue ?? 0) * 255)}
                    onChange={(value) => { onColorSliderChange(value, 'rgb', 'blue') }} />
            </div>
        </dialog>
    </>)
}
