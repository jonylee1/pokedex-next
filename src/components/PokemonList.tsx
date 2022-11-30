import { NamedAPIResource } from "pokenode-ts";

const PokemonList = ({ data }: {data: NamedAPIResource[]}) => {
  return (
    <div className="text-black list-none">
      {data.map((pokemon) => {
        const pokemonURL = pokemon.url;
        const index = pokemonURL.indexOf('pokemon');
        const pokemonPath = pokemonURL.substring(index);
        return <li key={pokemon.name}><a href={`/${pokemonPath}`}>{pokemon.name}</a></li>
      })}
    </div>
  )
};

export default PokemonList;