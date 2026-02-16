import './baseColor.css'
import { useState } from "react";
import ColorSwatch from "~/components/colorSwatch";
import ExportDialog from "~/components/exportDialog";
import { download, link45deg } from "~/lib/icons";
import { useGlobalStore } from "~/lib/globalStore";
import { ClipboardCopiedNotification } from '~/components/clipboardCopiedNotification';
import ColorDialog from '~/components/colorDialog';

export default function BaseColor() {
    const { base_color, toSearchParm } = useGlobalStore();
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
            <ul className="base-color__tools">
                <li><a onClick={handleExportClick}>{download}</a></li>
                <li className="base-color__link" >
                    <a onClick={handleLinkClick}>{link45deg}</a>
                </li>
                <ClipboardCopiedNotification isVisible={isCopied} setIsVisible={setIsCopied} />
                <ExportDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
            </ul>
        </section>
    );
}
