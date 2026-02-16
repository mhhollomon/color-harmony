import { useEffect, useRef } from "react";

import './notifcation.css'

export interface NotificationProps {
    isVisible: boolean,
    text? : string,
    setIsVisible: (isVisible: boolean) => void
}


export default function Notification({isVisible, text,setIsVisible }: NotificationProps) {

    const divRef = useRef<HTMLDivElement>(null);

    if (text === undefined) {
        text = "Copied to clipboard";
    }

    useEffect(() => {
        if (isVisible) {
            divRef.current?.classList.add('clip-notification--visible');
            const refreshTimer = setTimeout(() => {
                setIsVisible(false);
            }, 2500);
            return () => clearTimeout(refreshTimer);
        } else {
            divRef.current?.classList.remove('clip-notification--visible');
        }
    }, [isVisible]);


    return (
        <div className="clip-notification" ref={divRef}>
            {text}
        </div>
    )
}
