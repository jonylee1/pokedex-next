// Import your Client Component
import { NamedAPIResourceList } from 'pokenode-ts';

async function fetchData(): Promise<NamedAPIResourceList> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon`
  );
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await fetchData();

  function listOfPokemon() {
    return (
      <>
        {data.results.map((pokemon) => {
          return <li>{pokemon.name}</li>
        })}
      </>
    )
  }  
  
  if (data) {
    return (
      <>
        <div>
        There are {data.count} pokemon.
        </div>
        
        {listOfPokemon()}
      </>
    )
  }
  return <div>Loading...</div>
}
