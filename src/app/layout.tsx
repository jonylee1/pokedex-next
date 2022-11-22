"use client";
import '@styles/globals.css';
import PokemonList from 'src/components/PokemonList';

import { fetchPokemonList } from "./api";
import Image from 'next/image';

import DisplayScreen from '../../assets/DisplayScreen.svg';
import ProfilePicture from '../../assets/ProfilePicture.svg';
import { useEffect, useState } from 'react';
import { NamedAPIResourceList } from 'pokenode-ts';

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
        <div className="flex justify-center items-center">
          <div>
            <PokemonList data={data} />
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