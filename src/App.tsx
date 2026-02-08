import './App.css'
import Header from '~/components/header'
import logo from "./assets/notes-logo.svg"

import BaseColor from '~/components/baseColor'
import Monochrome from '~/components/monochrome'
import Analogous from '~/components/analogous'
import Complementary from '~/components/complementary'
import SplitComplementary from '~/components/splitComplementary'
import Triad from '~/components/triad'
import Tetrad from '~/components/tetrad'

import { useEffect } from 'react'
import { useGlobalStore } from "~/lib/globalStore"

const APP_NAME = 'Color Harmony'

export default function App() {
    const {fromSearchParm} = useGlobalStore();

    useEffect(() => {
        const urlObject = new URL(window.location.href);
        const state_string = urlObject.searchParams.get("s");

        if (state_string) {
            fromSearchParm(state_string);
        }
    }, []); // Run once on component mount

  return (
    <>
        {/* These get shifted up to the header by react */}
        <title>{APP_NAME}</title>
        <link rel="icon" type="image/svg+xml" href={logo} />

        <Header title={APP_NAME} avatar={logo} />
        <main className="main">
            {/* <div className="app-description">
                <p>Set the base color to get started. All the color harmonies will update when you change the base color.</p>
                <p>The current base color is also put in the URL, so you can bookmark your favorites.</p>
            </div> */}
            <div className="app__grid">
            <BaseColor />
            <Monochrome />
            <Analogous />
            <Complementary />
            <SplitComplementary />
            <Triad />
            <Tetrad />
            </div>
        </main>
        <footer className="footer">
            <p>The End</p>
        </footer>

    </>
  )
}
