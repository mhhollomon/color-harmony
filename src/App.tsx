import './App.css'
import Header from '~/components/header'
import logo from "./assets/notes-logo.svg"

import BaseColor from '~/components/baseColor'
import Monochrome from '~/components/monochrome'
import Analogous from '~/components/analogous'

import { useEffect } from 'react'
import { colorAtom } from '~/lib/atoms'
import { colorFromString } from '~/lib/color'
import { useAtom } from 'jotai'

const APP_NAME = 'Color Harmony'

export default function App() {
    const [_, setColor] = useAtom(colorAtom);

    useEffect(() => {

        const color_string = window.location.hash.substring(1);

        if (color_string) {
            const hex_string = '#' + color_string;
            const color = colorFromString(hex_string);
            setColor(color);
        }
    }, []); // Run once on component mount

  return (
    <>
        {/* These get shifted up to the header by react */}
        <title>{APP_NAME}</title>
        <link rel="icon" type="image/svg+xml" href={logo} />

        <Header title={APP_NAME} avatar={logo} />
        <main className="main">
            <div className="app-description">
                <p>Set the base color to get started. All the color harmonies will update when you change the base color.</p>
                <p>The current base color is also put in the URL, so you can bookmark your favorites.</p>
            </div>
            <h2>Base Color</h2>
            <BaseColor />
            <h2>Monochrome</h2>
            <Monochrome />
            <h2>Analogous</h2>
            <Analogous />
            <section>
                <h2>Complementary</h2>
            </section>
            <section>
                <h2>Split Complementary</h2>
            </section>
            <section>
                <h2>Triad</h2>
            </section>
        </main>

    </>
  )
}
