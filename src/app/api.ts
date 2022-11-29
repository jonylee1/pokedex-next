import { NamedAPIResourceList } from 'pokenode-ts';

export async function fetchPokemonList(offset: number, postsPerPage: number): Promise<NamedAPIResourceList> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${postsPerPage}`
  );
  const data = await res.json();
  return data;
}