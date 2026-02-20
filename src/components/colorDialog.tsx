import color from 'colorjs.io';
import { useEffect, useRef, useState } from "react";
import { Tabs } from 'radix-ui';
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
            new_color.srgb[channel] = value / 255;
        } else if (type === 'hsl') {
            new_color.hsl[channel] = value;
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


    /* lightness gradient */
    const hsl_gradient_start = new color(currentColor).to('hsl');
    hsl_gradient_start.hsl.lightness = 0;
    const hsl_gradient_end = new color(currentColor).to('hsl');
    hsl_gradient_end.hsl.lightness = 100;

    /* saturation gradient */
    const sat_gradient_start = new color(currentColor).to('hsl');
    sat_gradient_start.hsl.saturation = 0;
    const sat_gradient_end = new color(currentColor).to('hsl');
    sat_gradient_end.hsl.saturation = 100;

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
                <Tabs.Root className="color-dialog__tabs" defaultValue='rgb'>
                    <Tabs.List>
                        <Tabs.Trigger value='rgb'>RGB</Tabs.Trigger>
                        <Tabs.Trigger value='hsl'>HSL</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value='rgb'>
                        <ColorSlider min={0} max={255} title="Red"
                            gradientStart='#000' gradientEnd='#f00'
                            value={Math.floor((currentColor.srgb.red ?? 0) * 255)}
                            onChange={(value) => { onColorSliderChange(value, 'rgb', 'red') }} />
                        <ColorSlider min={0} max={255} title="Green"
                            gradientStart='#000' gradientEnd='#0f0'
                            value={Math.floor((currentColor.srgb.green ?? 0) * 255)}
                            onChange={(value) => { onColorSliderChange(value, 'rgb', 'green') }} />
                        <ColorSlider min={0} max={255} title="Blue"
                            gradientStart='#000' gradientEnd='#00f'
                            value={Math.floor((currentColor.srgb.blue ?? 0) * 255)}
                            onChange={(value) => { onColorSliderChange(value, 'rgb', 'blue') }} />
                    </Tabs.Content>
                    <Tabs.Content value='hsl'>
                        <ColorSlider min={0} max={359} title="Hue"
                            gradientStart='hsl(0, 100%, 50%)' gradientEnd='hsl(270, 100%, 50%)'
                            value={Math.floor(currentColor.hsl.hue ?? 0)}
                            onChange={(value) => { onColorSliderChange(value, 'hsl', 'hue') }} />
                        <ColorSlider min={0} max={100} title="Saturation"
                            gradientStart={sat_gradient_start.toString()}
                            gradientEnd={sat_gradient_end.toString()}
                            value={Math.floor(currentColor.hsl.saturation ?? 0)}
                            onChange={(value) => { onColorSliderChange(value, 'hsl', 'saturation') }} />
                        <ColorSlider min={0} max={100} title="Lightness"
                            gradientStart={hsl_gradient_start.toString()}
                            gradientEnd={hsl_gradient_end.toString()}
                            value={Math.floor(currentColor.hsl.lightness ?? 0)}
                            onChange={(value) => { onColorSliderChange(value, 'hsl', 'lightness') }} />
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </dialog>
    </>)
}
