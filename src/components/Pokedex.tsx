import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Card from './Card';

// type Pokemons = {
//   name: string;
//   url: string;
// };

export type PokedexProp = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  abilities?: {
    ability: string;
    name: string;
  }[];
  stats: [];
};

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState<PokedexProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setNext(res.data.next);
        setPrevious(res.data.previous);
        getPokemons(res.data.results);
      } catch (error) {
        console.log(error);
        alert('Error fetching data from server');
      }
    };

    fetchData();
  }, [url]);

  const getPokemons = async (res: any) => {
    res.map(async (item: any) => {
      // console.log(item.url);
      const result = await axios.get(item.url);
      // console.log(result.data);
      setPokemonData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
    setLoading(false);
  };

  return (
    <>
      <Header />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className='container'>
          {pokemonData.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
      <div className='btn-group'>
        {previous && (
          <button
            onClick={() => {
              setPokemonData([]);
              setUrl(previous);
            }}
          >
            Previous
          </button>
        )}
        {next && (
          <button
            onClick={() => {
              setPokemonData([]);
              setUrl(next);
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Pokedex;
