
import { colorFromString } from "~/lib/color";
import './baseColor.css'
import { useEffect, useState } from "react";
import ColorSwatch from "~/components/colorSwatch";
import ExportDialog from "~/components/exportDialog";
import { download, link45deg } from "~/lib/icons";
import { useGlobalStore } from "~/lib/globalStore";

export default function BaseColor() {
    const { base_color, setBaseColor, toSearchParm } = useGlobalStore();
    const [color_string, setColorString] = useState<string>(base_color.toString());
    const [errorMsg, setErrorMsg] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    console.log(`color: ${base_color.toString()}`);

    function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
        setColorString(e.target.value);
        try {
            const new_color = colorFromString(e.target.value);
            setBaseColor(new_color);
            setErrorMsg("");
        } catch (err) {
            console.log(err);
            setErrorMsg((err as Error).message);
        }
    }

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

    useEffect(() => {
        /* make sure our string matches the current color on mount */
        setColorString(base_color.toString());
    }, [base_color]);

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        }
    }, [isCopied]);


    return (
        <section className="base-color">
            <h2 className="base-color__title">Base Color</h2>
            <div className="base-color__body">
                <div className="base-color__description">
                    <p>Enter a color in hex, rgb, or hsl format.</p>
                    <p>For example: <code>#ff0000</code> , <code>rgb(255, 0, 0)</code>, or <code>hsl(0, 100%, 50%)</code>.</p>
                    <p>This color will be used as the base to create the color harmonies.</p>
                    <p>You can click on the color swatch to grab the css values.</p>
                </div>
                <div className="base-color__grid">
                    <ColorSwatch color={base_color} className="base-color__swatch" index="base-color" />
                    <div className="base-color__input">
                        <label htmlFor="swatch-color">Color (hex, rgb, or hsl)</label>
                        <input type="text" name="swatch-color" id="swatch-color" value={color_string}
                            onChange={(e) => changeColor(e)} />
                        <div className="base-color__error">{errorMsg}</div>
                    </div>
                </div>
            </div>
            <ul className="base-color__tools">
                <li><a onClick={handleExportClick}>{download}</a></li>
                <li className="base-color__link" >
                    <a onClick={handleLinkClick}>{link45deg}</a>
                </li>
                <div className={"base-color__copied" + (isCopied ? " base-color__copied--visible" : "")}>
                    Link copied to clipboard!
                </div>
                <ExportDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
            </ul>
        </section>
    );
}
