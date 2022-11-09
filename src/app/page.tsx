"use client";
import { NamedAPIResourceList } from "pokenode-ts";
import { useEffect, useState } from "react";
import { fetchPokemonList } from "./api";

function listOfPokemon(data: NamedAPIResourceList) {
  if (data) {
    return (
      <>
        {data.results.map((pokemon) => {
          const pokemonURL = pokemon.url;
          const index = pokemonURL.indexOf('pokemon');
          const pokemonPath = pokemonURL.substring(index);
          return <li key={pokemon.name}><a href={`/${pokemonPath}`}>{pokemon.name}</a></li>
        })}
      </>
    )
  } else {
    return (
      <></>
    )
  }
}

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
        
        {listOfPokemon(data)}
      </>
    )
  }
  return <div>Loading...</div>
}
