"use client";
import '@styles/globals.css';
import PokemonList from 'src/components/PokemonList';

import DisplayScreen from '../../assets/DisplayScreen.svg';
import PokeDex from '../../assets/PokeDex.svg';

import { useState } from 'react';

import CustomScrollDiv from '../components/CustomScrollDiv/CustomScrollDiv';

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [offset, setOffset] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(20);

    const fetchMoreData = () => {
      setOffset(offset + postsPerPage);
    }
  
    return (
      <html lang="en">
        <head>
          <title>Next.js</title>
        </head>
        <body>
          <div className="flex justify-center">
            <div className="flex mt-10"  style={{
            backgroundImage: `url(${PokeDex.src})`,
            backgroundRepeat: 'no-repeat',
            width: PokeDex.width,
            height: PokeDex.height,
          }}>
              <div id="pokemonList" className="h-3/5 w-80 mt-16 ml-14 text-4xl">
                <CustomScrollDiv updatePokemonListFunction={fetchMoreData}>
                  <PokemonList offset={offset} postsPerPage={postsPerPage} />
                </CustomScrollDiv>
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