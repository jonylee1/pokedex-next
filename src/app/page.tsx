"use client";
import { NamedAPIResourceList } from "pokenode-ts";
import { useEffect, useState } from "react";
import PokemonList from "src/components/PokemonList";

import DisplayScreen from '../../assets/DisplayScreen.svg';
import ProfilePicture from '../../assets/ProfilePicture.svg';

import { fetchPokemonList } from "./api";
import Image from 'next/image';

export default function Page() {
  const [data, setData] = useState<NamedAPIResourceList>({count: 0, next: null, previous: null, results: []});

  useEffect(() => {
    fetchPokemonList().then((data) => {
      setData(data);
    })
  },[]);

  if (data.count !== 0) {
    return (
      <>
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
          <Image className="mr-28" src={ProfilePicture} alt="Profile Picture" height={ProfilePicture.height} width={ProfilePicture.width} />
        </div>
      </div>

      </>
    )
  }
  return <div>Loading...</div>
}
