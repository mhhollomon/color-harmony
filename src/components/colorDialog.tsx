import color from 'colorjs.io';
import { useEffect, useRef, useState } from "react";
import { useGlobalStore } from "~/lib/globalStore";
import './colorDialog.css'
import { Color } from "~/lib/color";
import { x_large } from '~/lib/icons';
import ColorSwatch from '~/components/colorSwatch';

export interface ColorDialogProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export default function ColorDialog({ isOpen, setIsOpen }: ColorDialogProps) {
    const [colorString, setColorString] = useState('#000000');
    const { base_color, setBaseColor } = useGlobalStore();
    const [ currentColor, setCurrentColor ] = useState(new color(base_color.toString()));
    const [ errorMsg, setErrorMsg ] = useState('');
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
        <dialog open={true} className="color-dialog" ref={dialogRef} onClose={()=> setIsOpen(false)}>
            <div className="color-dialog__content">
                <header className='color-dialog__header'>Set Color
                    <button onClick={() => setIsOpen(false)}>{x_large}</button>
                </header>

                <ColorSwatch color={new Color(currentColor)} className="color-dialog__color-swatch" index="dialog" />

                <label htmlFor="color-string">Color</label>
                <input type="text" value={colorString} id="color-string" onChange={onChange} />
                {errorMsg ? <p className="color-dialog__error">{errorMsg}</p> : null}
                <button onClick={handleSave}>Save</button>
            </div>
        </dialog>
    </>)
}
