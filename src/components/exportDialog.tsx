import { useEffect, useRef, useState } from 'react';
import './exportDialog.css'
import { useGlobalStore, COMPLEMENTARY_SLIDER_INDEX, ANALOGOUS_SLIDER_INDEX, SPLIT_COMPLEMENTARY_SLIDER_INDEX, TETRAD_SLIDER_INDEX } from '~/lib/globalStore';
import { analogousColors, complementaryColors, monochromeColors, splitComplementaryColors, tetradColors, triadColors } from '~/lib/algorithms';

import { copy as copy_icon, x_large } from '~/lib/icons';
import Notification from '~/components/notification';

export interface ExportDialogProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

export default function ExportDialog({ isOpen, setIsOpen }: ExportDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const textRef = useRef<HTMLButtonElement>(null);
    const { base_color, angles } = useGlobalStore();
    const [format, setFormat] = useState('hsl');
    const [isCopied, setIsCopied] = useState(false);
    const [prefix, setPrefix] = useState('');
    const [makeBaseAlias, setMakeBaseAlias] = useState(false);


    function setFormatState(new_format: string) {
        document.getElementById(format)?.classList.remove('export-dialog__tool-button--active');
        setFormat(new_format);
    }

    function var_name(label: string): string {
        return `--${prefix}${label}`
    }

    useEffect(() => {
        document.getElementById(format)?.classList.add('export-dialog__tool-button--active');
    }, [format]);

    function generateData(): string {
        const color_vars: string[] = [];

        function blankLine() {
            color_vars.push('');
        }
        color_vars.push(`  ${var_name('base')}: ${base_color.toFormatString(format)}`);

        blankLine();
        const monochrome = monochromeColors(base_color);
        color_vars.push(`  /* MONOCHROME */`);
        let color_index = 1;
        for (let i = 0; i < monochrome.length; i++) {
            if (monochrome[i].label === 'Base') {
                if (makeBaseAlias) {
                    color_vars.push(`  ${var_name('monochrome')}-${color_index}: var(${var_name('base')});`);
                    color_index++;
                } else {
                    color_vars.push(` /* base here */`);
                }

            } else {
                color_vars.push(`  ${var_name('monochrome')}-${color_index}: ${monochrome[i].color.toFormatString(format)}`);
                color_index++;
            }
        }

        blankLine();
        const analogous = analogousColors(base_color, angles[ANALOGOUS_SLIDER_INDEX]);
        color_vars.push(`  /* ANALOGOUS ${angles[ANALOGOUS_SLIDER_INDEX]} degrees */`);
        color_index = 1;
        if (makeBaseAlias) {
            color_vars.push(`  ${var_name('analogous')}-${color_index++}: var(${var_name('base')});`);
        }
        color_vars.push(`  ${var_name('analogous')}-${color_index++}: ${analogous[0].color.toFormatString(format)}`);
        color_vars.push(`  ${var_name('analogous')}-${color_index}: ${analogous[2].color.toFormatString(format)}`);

        blankLine();
        const complementary = complementaryColors(base_color, angles[COMPLEMENTARY_SLIDER_INDEX]);
        color_vars.push(`  /* COMPLEMENTARY ${angles[COMPLEMENTARY_SLIDER_INDEX]} degrees */`);
        if (makeBaseAlias) {
            color_vars.push(`  ${var_name('complementary')}-1: var(${var_name('base')});`);
            color_vars.push(`  ${var_name('complementary')}-2: ${complementary[1].color.toFormatString(format)}`);
        } else {
            color_vars.push(`  ${var_name('complementary')}: ${complementary[1].color.toFormatString(format)}`);
        }

        blankLine();
        const split_complementary = splitComplementaryColors(base_color, angles[SPLIT_COMPLEMENTARY_SLIDER_INDEX]);
        color_vars.push(`  /* SPLIT COMPLEMENTARY ${angles[SPLIT_COMPLEMENTARY_SLIDER_INDEX]} degrees */`);
        color_index = 1;
        if (makeBaseAlias) {
            color_vars.push(`  ${var_name('split-complementary')}-${color_index++}: var(${var_name('base')});`);
        }
        color_vars.push(`  ${var_name('split-complementary')}-${color_index++}: ${split_complementary[0].color.toFormatString(format)}`);
        color_vars.push(`  ${var_name('split-complementary')}-${color_index++}: ${split_complementary[2].color.toFormatString(format)}`);

        blankLine();
        const triadic = triadColors(base_color, 120);
        color_vars.push(`  /* TRIADIC 120 degrees */`);
        color_index = 1;
        if (makeBaseAlias) {
            color_vars.push(` ${var_name('triad')}-${color_index++}: var(${var_name('base')});`);
        }
        color_vars.push(`  ${var_name('triad')}-${color_index++}: ${triadic[0].color.toFormatString(format)}`);
        color_vars.push(`  ${var_name('triad')}-${color_index++}: ${triadic[1].color.toFormatString(format)}`);

        blankLine();
        const tetrad = tetradColors(base_color, angles[TETRAD_SLIDER_INDEX]);
        color_vars.push(`  /* TETRADIC ${angles[TETRAD_SLIDER_INDEX]} degrees */`);
        color_index = 1;
        if (makeBaseAlias) {
            color_vars.push(`. ${var_name('tetrad')}-${color_index++}: var(${var_name('base')});`);
        }
        color_vars.push(`  ${var_name('tetrad')}-${color_index++}: ${tetrad[1].color.toFormatString(format)} /* base complement */`);
        color_vars.push(`  ${var_name('tetrad')}-${color_index++}: ${tetrad[2].color.toFormatString(format)} /* second color */`);
        color_vars.push(`  ${var_name('tetrad')}-${color_index++}: ${tetrad[3].color.toFormatString(format)} /* second complement */`);


        return ":root\n" + color_vars.join('\n') + '\n}';
    }

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
            textRef.current?.focus();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    return (
        <>
            {/* Need the onClose to capture when 'esc' is pressed (rather than the close button). */}
            <dialog className="export-dialog" ref={dialogRef} onClose={() => setIsOpen(false)}>
                <header className='export-dialog__header'>
                    <div>Export</div>
                    <button onClick={() => setIsOpen(false)}>{x_large}</button>
                </header>
                <div className="export-dialog__content">
                    <div className="export-dialog__prefix">
                        <label htmlFor="prefix">var name prefix</label>
                        <input id="prefix" type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
                    </div>
                    <div>
                        <input type="checkbox" id="make-base-alias" name="make-base-alias" checked={makeBaseAlias} onChange={() => setMakeBaseAlias(!makeBaseAlias)} />
                        <label htmlFor="make-base-alias">Add alias to base</label>
                    </div>
                    <div className="export-dialog__format">
                        <button id="hsl" className="export-dialog__tool-button" onClick={() => setFormatState("hsl")}>hsl</button>
                        <button id="rgb" className="export-dialog__tool-button" onClick={() => setFormatState("rgb")}>rgb</button>
                        <button id="hex" className="export-dialog__tool-button" onClick={() => setFormatState("hex")}>hex</button>
                        <button id="oklch" className="export-dialog__tool-button" onClick={() => setFormatState("oklch")}>oklch</button>
                        <button id="oklab" className="export-dialog__tool-button" onClick={() => setFormatState("oklab")}>oklab</button>
                        <button className="export-dialog__tool-button export_dialog__copy"
                            ref={textRef}
                            onClick={() => { navigator.clipboard.writeText(generateData()); setIsCopied(true) }}>
                            {copy_icon}
                        </button>
                        <Notification key="export-notifcation" text="CSS copied to clipboard" isVisible={isCopied} setIsVisible={setIsCopied} />
                    </div>
                    <textarea name="export" id="export" rows={20} cols={50} readOnly={true}
                        value={generateData()}
                    >
                    </textarea>
                    <footer></footer>
                </div>
            </dialog>
        </>
    )
}
