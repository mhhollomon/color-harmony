import './baseColor.css'
import { useState } from "react";
import { useGlobalStore } from "~/lib/globalStore";

import ColorSwatch from "~/components/colorSwatch";
import ExportDialog from "~/components/exportDialog";
import Notification from '~/components/notification';
import ColorDialog from '~/components/colorDialog';
import ToolGroup, { type toolGroupData } from '~/components/toolGroup';

import { download, link45deg, x_large } from "~/lib/icons";
import { pickRandomColor } from '~/lib/algorithms';

const dice = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"/>
  <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
</svg>

const undo_icon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
</svg>

const redo_icon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
</svg>

export default function BaseColor() {
    const { base_color, setBaseColor, toSearchParm, undo, redo, resetHistory } = useGlobalStore();
    const [isCopied, setIsCopied] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);


    console.log(`color: ${base_color.toString()}`);

    function handleLinkClick() {
        const currentUrl = window.location.href;
        const urlObject = new URL(currentUrl);
        const searchString = toSearchParm();
        urlObject.search="";
        urlObject.hash = "";
        urlObject.searchParams.set("s", searchString);
        const newUrl = urlObject.href;
        navigator.clipboard.writeText(newUrl);
        setIsCopied(true);
    }

    function handleExportClick() {
        setIsDialogOpen(true);
    }

    function handleRandomClick() {
        const new_color = pickRandomColor();
        setBaseColor(new_color);
    }

    function handleResetClick() {
        resetHistory();
    }

    function handleUndoClick() {
        undo();

    }

    function handleRedoClick() {
        redo();

    }


    const tools: toolGroupData[] = [
        { title: dice, callback: handleRandomClick },
        { title: download, callback: handleExportClick },
        { title: link45deg, callback: handleLinkClick },

    ]

    const historyTools : toolGroupData[] = [
        { title: undo_icon, callback: handleUndoClick },
        { title: redo_icon, callback: handleRedoClick },
    ]


    return (
        <section className="base-color">
            <h2 className="base-color__title">Base Color</h2>
            <div className="base-color__body">
                <div className="base-color__description">
                    <p>Enter a color in hex, rgb, or hsl format.</p>
                    <p>For example: <code>#ff0000</code> , <code>rgb(255 0 0)</code>, or <code>hsl(0 100% 50%)</code>.</p>
                    <p>This color will be used as the base to create the color harmonies.</p>
                    <p>Tools in the corner of the card will let you export the all the colors and create a link to show others.</p>
                </div>
                <div className="base-color__grid">
                    <ColorSwatch color={base_color} className="base-color__swatch"  focusAction={false} index="base-color" />
                    <button className="base-color__edit" type="button" onClick={() => setIsColorDialogOpen(true)}>Set Color</button>
                    <ColorDialog isOpen={isColorDialogOpen} setIsOpen={setIsColorDialogOpen} />
                </div>
            </div>
            <div className="base-color__tools">
            <ToolGroup tools={historyTools}></ToolGroup>
            <ToolGroup tools={tools} className="base-color__link"></ToolGroup>
            <ToolGroup tools={[{title: x_large, callback: handleResetClick}]} className="base-color__reset"></ToolGroup>
            <Notification isVisible={isCopied} text="Link copied to clipboard" setIsVisible={setIsCopied} />
            <ExportDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
            </div>
        </section>
    );
}
