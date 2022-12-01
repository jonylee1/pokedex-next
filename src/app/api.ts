import { NamedAPIResourceList } from 'pokenode-ts';

export async function fetchPokemonList(offset: number, postsPerPage: number): Promise<NamedAPIResourceList> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${postsPerPage}`, {cache: 'force-cache'}
  );
  const data = await res.json();
  return data;
}

export const fetchStaticPokemonList = {
  "count": 1154,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=3&limit=3",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon/3/"
    }
  ]
}