"use client";
import '@styles/globals.css';
import PokemonList from 'src/components/PokemonList';

import { fetchPokemonList } from "./api";

import DisplayScreen from '../../assets/DisplayScreen.svg';
import PokeDex from '../../assets/PokeDex.svg';

import { useEffect, useState } from 'react';
import { NamedAPIResource, } from 'pokenode-ts';


export const revalidate = 5;
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [offset, setOffset] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const [data, setData] = useState<NamedAPIResource[]>([]);

    useEffect(() => {
      console.log('inside useEffect');
      fetchPokemonList(offset, postsPerPage).then((newData) => {
        console.log('useEffect/newData: ', newData);
        setData(data.concat(newData.results));
      })
    },[offset]);

    var handleScroll = () => {
      const pokemonListElement = document.getElementById('pokemonList');
      if (pokemonListElement) {
        const isAtBottom = pokemonListElement.scrollHeight - pokemonListElement.scrollTop <= pokemonListElement.clientHeight;
        
        if (isAtBottom) {
          setOffset(offset + postsPerPage);
        }
      } else {
        console.log('pokemon list not found');
      }
    }

    console.log('Layout/data: ', data);
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
              <div id="pokemonList" className="h-3/5 w-80 mt-16 ml-14 overflow-y-scroll text-4xl" onScroll={handleScroll} >
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