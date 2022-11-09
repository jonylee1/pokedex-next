"use client";
import { NamedAPIResourceList } from "pokenode-ts";
import { useEffect, useState } from "react";
import PokemonList from "src/components/PokemonList";
import { fetchPokemonList } from "./api";

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
        <div>
          There are {data.count} pokemon.
        </div>
        
        <PokemonList data={data} />
      </>
    )
  }
  return <div>Loading...</div>
}
