import { Pokemon } from "pokenode-ts";

interface PokemonPage {
    id: number,
    name: string,
    type: string
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  const data = await res.json();
  return data;
}

export default async function Page(props: any) {
  console.log(props);
  const data = await fetchPokemon(props.params.id);
  if (data) {
      return (
      <>
          <div>{data.id}</div>
          <div>{data.name}</div>
          {/* <div>{data.types[0].type.name}</div> */}
      </>
      )
  }
  return <div>Loading...</div>
}
