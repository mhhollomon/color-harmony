import { useEffect, useRef } from "react";

import './clipboardCopiedNotifcation.css'

export type ClipboardCopiedNotificationProps = {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void
}


export function ClipboardCopiedNotification({isVisible, setIsVisible }: ClipboardCopiedNotificationProps) {

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) {
            divRef.current?.classList.add('clip-notification--visible');
            const refreshTimer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return () => clearTimeout(refreshTimer);
        } else {
            divRef.current?.classList.remove('clip-notification--visible');
        }
    }, [isVisible]);


    return (
        <div className="clip-notification" ref={divRef}>
            Copied to clipboard
        </div>
    )
}
