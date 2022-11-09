import { NamedAPIResourceList } from 'pokenode-ts';

export async function fetchPokemonList(): Promise<NamedAPIResourceList> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon`
  );
  const data = await res.json();
  return data;
}