import { NamedAPIResource } from "pokenode-ts";
import { useEffect, useState } from "react";
import { fetchPokemonList, fetchStaticPokemonList } from "src/app/api";

const PokemonList = ({ offset, postsPerPage }: {offset: number, postsPerPage: number}) => {
  const [data, setData] = useState<NamedAPIResource[]>([]);
  
  useEffect(() => {
    fetchPokemonList(offset, postsPerPage).then((newData) => {
      setData(data.concat(newData.results));
    })
    // setData(fetchStaticPokemonList.results);
  },[offset]);

  return (
    // <div className="text-black list-none">
    //   {data.map((pokemon) => {
    //     const pokemonURL = pokemon.url;
    //     const index = pokemonURL.indexOf('pokemon');
    //     const pokemonPath = pokemonURL.substring(index);
    //     return <li key={pokemon.name}><a href={`/${pokemonPath}`}>{pokemon.name}</a></li>
    //   })}
    // </div>
    <ul>
      {data.map((pokemon) => {
        const pokemonURL = pokemon.url;
        const index = pokemonURL.indexOf('pokemon');
        const pokemonPath = pokemonURL.substring(index);
        return <li key={pokemon.name}><a href={`/${pokemonPath}`}>{pokemon.name}</a></li>
      })}
    </ul>
  )
};

export default PokemonList;