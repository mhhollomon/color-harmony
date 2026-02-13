import { useEffect, type JSX } from "react";

import { atomWithStorage } from 'jotai/utils'
import { useAtom } from "jotai/react";
import * as icons from "~/icons"
import './header.css'

export const themeAtom = atomWithStorage('site-theme', 'light', undefined, { getOnInit: true })

export type HeaderProps = {
    title: string,
    avatar: JSX.Element
}

export default function Header({ title, avatar }: HeaderProps) {
    const [theme, setTheme] = useAtom(themeAtom);

    useEffect(() => {
        console.log(`setting theme: ${theme}`);
        if (theme === 'auto') {
            const autoTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            document.documentElement.setAttribute('data-theme', autoTheme);
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);


    function changeTheme(theme : string) {
        setTheme(theme);
    }

    const themeIcon = theme === 'light' ? icons.sunFill : (theme === 'dark' ? icons.moonStarsFill : icons.circleHalf);

    return (
        <header className="hero-header">
            <div className="hero-header__avatar">{avatar}</div>
            <p className="hero-header__title">{title}</p>
            <div className="theme-switcher">
                <button className="theme-switcher__btn" type="button" popoverTarget="theme-switcher__menu"
                    popoverTargetAction="toggle" aria-label="Toggle theme">
                    {themeIcon}
                    <span>Theme</span>
                </button>
                <ul className="theme-switcher__menu" popover="auto" id="theme-switcher__menu" aria-label="Change visual theme">
                    <li>
                        <button type="button" popoverTarget="theme-switcher__menu"
                            popoverTargetAction="hide"
                            onClick={() => changeTheme('light')}
                            aria-pressed={theme === 'light'}>
                            {icons.sunFill}
                            <span className="theme-switcher__menu-item-label">Light</span>
                            {theme === 'light' && icons.check2}
                        </button>
                    </li>
                    <li>
                        <button type="button" popoverTarget="theme-switcher__menu"
                            popoverTargetAction="hide"
                            onClick={() => changeTheme('dark')}
                            aria-pressed={theme === 'dark'}>
                            {icons.moonStarsFill}
                            <span className="theme-switcher__menu-item-label">Dark</span>
                            {theme === 'dark' && icons.check2}
                        </button>
                    </li>
                    <li>
                        <button type="button" popoverTarget="theme-switcher__menu"
                            popoverTargetAction="hide"
                            onClick={() => changeTheme('auto')}
                            aria-pressed={theme === 'auto'}>
                            {icons.circleHalf}
                            <span className="theme-switcher__menu-item-label">Auto</span>
                            {theme === 'auto' && icons.check2}
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}
