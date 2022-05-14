import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Card from './Card';
import Loader from './Loader';

type Pokemons = {
  name: string;
  url: string;
};

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

const Pokedex: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<PokedexProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon/');
  const [next, setNext] = useState<string>('');
  // const [previous, setPrevious] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredList, setFilteredList] = useState<PokedexProp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setNext(res.data.next);
        // setPrevious(res.data.previous);
        getPokemons(res.data.results);
      } catch (error) {
        console.log(error);
        alert('Error fetching data from server');
      }
    };

    fetchData();
  }, [url]);

  const getPokemons = async (res: any) => {
    res.map(async (item: Pokemons) => {
      const result = await axios.get(item.url);
      setPokemonData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
    setLoading(false);
  };

  const handleFilter = (filter: string) => {
    setSearchTerm(filter);
    if (filter !== '') {
      const newList: PokedexProp[] = pokemonData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(filter.toLowerCase());
      });
      setFilteredList(newList);
    } else {
      setFilteredList(pokemonData);
    }
  };

  return (
    <>
      <Header filter={handleFilter} />
      {loading ? (
        <Loader />
      ) : (
        <div className='container'>
          {searchTerm.length < 1
            ? pokemonData.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)
            : filteredList.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)}
        </div>
      )}
      <div className='btn-group'>
        {/* {previous && (
          <button
            onClick={() => {
              setPokemonData([]);
              setUrl(previous);
            }}
          >
            Previous
          </button>
        )} */}
        {next && searchTerm.length < 1 && (
          <button
            onClick={() => {
              // setPokemonData([]);
              setUrl(next);
            }}
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default Pokedex;
