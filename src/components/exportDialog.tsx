import { useEffect, useRef } from 'react';
import './exportDialog.css'

export interface ExportDialogProps {
    isOpen : boolean,
    setIsOpen : (isOpen : boolean) => void
}

export default function ExportDialog({isOpen, setIsOpen} : ExportDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog className="export-dialog" ref={dialogRef}>
            <header>ExportDialog</header>
            <main>
                <textarea name="export" id="export" cols={80} rows={30} readOnly={true}>
                    This is a textarea
                </textarea>
            </main>
            <footer><button onClick={() => setIsOpen(false)}>Close</button></footer>
        </dialog>
    )
}
