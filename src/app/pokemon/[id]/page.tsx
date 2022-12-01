import { FlavorText, Pokemon, PokemonSpecies, PokemonType } from "pokenode-ts";
import Image from 'next/image';

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  const data = await res.json();
  return data;
}

export async function fetchPokemonDescription(url: string): Promise<string> {
  const res = await fetch(url);
  const data: PokemonSpecies = await res.json();
  const flavorText = data.flavor_text_entries.find(flavorText => flavorText.language.name === 'en')?.flavor_text ?? 'no english flavor text found';
  return flavorText;
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
  // console.log('inside pokemon Page: ', props);
  // const pokemonData = await fetchPokemon(props.params.id);
  // console.log('pokemonData', pokemonData);
  // const pokemonDescription = await fetchPokemonDescription(pokemonData.species.url)
  // console.log('pokemonDescription', pokemonDescription);
  // const pokemonType = formatPokemonType(pokemonData.types);
  // let pokemonSprite = pokemonData.sprites.front_default;
  // if (!pokemonSprite) {
  //   pokemonSprite = '';
  // }

  // if (pokemonData) {
  //     return (
  //       <>
  //         <div className="flex flex-col w-1/3 h-3/4 mr-5">
  //           <div className="h-1/5 rounded-lg bg-white bg-opacity-30 mb-5">
  //             <div className="capitalize-first-letter text-4xl">
  //               {pokemonData.name}
  //             </div>
  //             <div className="capitalize-first-letter text-4xl">
  //               {pokemonType}
  //             </div>
  //           </div>
  //           <div className="flex-grow rounded-lg bg-white bg-opacity-30">
  //             {pokemonDescription}
  //           </div>
  //         </div>
  //         <div className="w-5/12 h-3/4 rounded-lg bg-white bg-opacity-30 mr-24">
  //             <Image className="w-full" src={pokemonSprite} alt={"faq"} width={96} height={96} />
  //         </div>
  //       </>
  //     )
  // }
  // return <div>Loading...</div>
  return <div>{props.params.id}</div>
}
