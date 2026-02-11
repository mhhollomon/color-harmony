import { useEffect, useRef } from 'react';
import './exportDialog.css'
import { useGlobalStore, COMPLEMENTARY_SLIDER_INDEX, ANALOGOUS_SLIDER_INDEX, SPLIT_COMPLEMENTARY_SLIDER_INDEX } from '~/lib/globalStore';
import { analogousColors, complementaryColors } from '~/lib/algorithms';

export interface ExportDialogProps {
    isOpen : boolean,
    setIsOpen : (isOpen : boolean) => void
}

export default function ExportDialog({isOpen, setIsOpen} : ExportDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const {base_color, angles} = useGlobalStore();

    function generateData() : string {
        const color_vars : string[] = [];
        color_vars.push(`  --base: ${base_color.toString()}`);

        const complementary = complementaryColors(base_color, angles[COMPLEMENTARY_SLIDER_INDEX]);
        color_vars.push(`  /* COMPLEMENTARY ${angles[COMPLEMENTARY_SLIDER_INDEX]} degrees */`);
        color_vars.push(` --complementary: ${complementary[1].color.toString()}`);

        const analogous = analogousColors(base_color, angles[ANALOGOUS_SLIDER_INDEX]);
        color_vars.push(`  /* ANALOGOUS ${angles[ANALOGOUS_SLIDER_INDEX]} degrees */`);
        color_vars.push(` --analogous-1: ${analogous[0].color.toString()}`);
        color_vars.push(` --analogous-2: ${analogous[2].color.toString()}`);

        const split_complementary = analogousColors(base_color, angles[SPLIT_COMPLEMENTARY_SLIDER_INDEX]);
        color_vars.push(`  /* SPLIT COMPLEMENTARY ${angles[SPLIT_COMPLEMENTARY_SLIDER_INDEX]} degrees */`);
        color_vars.push(` --split-complementary-1: ${split_complementary[0].color.toString()}`);
        color_vars.push(` --split-complementary-2: ${split_complementary[2].color.toString()}`);


        return ":root\n" + color_vars.join('\n') + '\n}';
    }

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog className="export-dialog" ref={dialogRef}>
            <div className="export-dialog__content">
            <header className='export-dialog__header'>Export
                <button onClick={() => setIsOpen(false)}>Close</button>
            </header>
            <main>
                <textarea name="export" id="export" rows={10} cols={50} readOnly={true}
                    value={generateData()}
                >
                </textarea>
            </main>
            <footer></footer>
            </div>
        </dialog>
    )
}
