import { Pokemon, PokemonSpecies, PokemonType } from "pokenode-ts";

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

export async function fetchPokemonDescription(url: string): Promise<PokemonSpecies> {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function formatPokemonType(types: PokemonType[]): string {
  let formattedType = '';
  for (let typeIterator = 0 ; typeIterator < types.length ; typeIterator++) {
    formattedType += types[typeIterator].type.name;
    if (types.length > 1 && typeIterator !== types.length - 1) {
      formattedType += ' / ';
    }
  }
  return formattedType;
}

export default async function Page(props: any) {
  console.log(props);
  const pokemonData = await fetchPokemon(props.params.id);
  const pokemonDescription = await fetchPokemonDescription(pokemonData.species.url)
  const pokemonType = formatPokemonType(pokemonData.types);

  if (pokemonData) {
      return (
        <>
          <div className="flex flex-col w-1/5 h-3/4 mr-5">
            <div className="h-1/5 rounded-lg bg-white bg-opacity-30 mb-5">
              <div className="capitalize-first-letter text-4xl">
                {pokemonData.name}
              </div>
              <div className="capitalize-first-letter text-4xl">
                {pokemonType}
              </div>
            </div>
            <div className="flex-grow rounded-lg bg-white bg-opacity-30">
              {pokemonDescription.flavor_text_entries[0].flavor_text}
            </div>
          </div>
          <div className="w-1/3 h-3/4 rounded-lg bg-white bg-opacity-30 mr-28">
              Pokemon Image
          </div>
        </>
      )
  }
  return <div>Loading...</div>
}
