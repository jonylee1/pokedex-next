import { NamedAPIResourceList } from "pokenode-ts";

const PokemonList = ({ data }: {data: NamedAPIResourceList}) => {
  if (data) {
      return (
        <div className="text-black list-none">
          {data.results.map((pokemon) => {
            const pokemonURL = pokemon.url;
            const index = pokemonURL.indexOf('pokemon');
            const pokemonPath = pokemonURL.substring(index);
            return <li key={pokemon.name}><a href={`/${pokemonPath}`}>{pokemon.name}</a></li>
          })}
        </div>
      )
  } else {
    return (
      <></>
    )
  }
};

export default PokemonList;