"use client";
import '@styles/globals.css';
import PokemonList from 'src/components/PokemonList';

import { fetchPokemonList } from "./api";

import DisplayScreen from '../../assets/DisplayScreen.svg';
import PokeDex from '../../assets/PokeDex.svg';

import { useEffect, useState } from 'react';
import { NamedAPIResourceList, Pokedexes } from 'pokenode-ts';

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode;
  }) {

    const [data, setData] = useState<NamedAPIResourceList>({count: 0, next: null, previous: null, results: []});

    useEffect(() => {
      fetchPokemonList().then((data) => {
        setData(data);
      })
    },[]);

    return (
      <html lang="en">
        <head>
          <title>Next.js</title>
        </head>
        <body>
        <div className="flex justify-center">
          <div className="flex mt-10" style={{
            backgroundImage: `url(${PokeDex.src})`,
            backgroundRepeat: 'no-repeat',
            width: PokeDex.width,
            height: PokeDex.height,
          }}>
            <div className="h-3/5 w-80 mt-16 ml-14 overflow-y-scroll text-4xl">
              <PokemonList data={data} />
            </div>
          </div>
          <div className="flex justify-end items-center" style={{
            backgroundImage: `url(${DisplayScreen.src})`,
            backgroundRepeat: 'no-repeat',
            width: DisplayScreen.width,
            height: DisplayScreen.height,
          }}>
            {children}
          </div>
        </div>
        </body>
      </html>
    );
  }