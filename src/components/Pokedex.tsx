import React, { useCallback, useEffect, useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredList, setFilteredList] = useState<PokedexProp[]>([]);
  const [offset, setOffset] = useState(0);
  const [y, setY] = useState(window.scrollY);

  const handleNavigation = useCallback(
    (e: any) => {
      const window = e.currentTarget;
      if (y < window.scrollY) {
        // console.log('scrolling down');
        if (
          e.target.documentElement.scrollTop + window.innerHeight >=
          e.target.documentElement.scrollHeight
        ) {
          console.log('At the bottom');
          setOffset((prev) => prev + 30);
        }
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('API calling....');
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
        );
        res.data.results.forEach(async (result: Pokemons) => {
          const detailedRes = await axios.get(result.url);
          setPokemonData((state) => {
            state = [...state, detailedRes.data];
            state.sort((a, b) => (a.id > b.id ? 1 : -1));
            setLoading(false);
            return state;
          });
        });
      } catch (error) {
        console.log(error);
        alert('Error fetching data from server');
      }
    };
    fetchData();
  }, [offset]);

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
            ? pokemonData.map((pokemon, i) => <Card key={i} pokemon={pokemon} />)
            : filteredList.map((pokemon, i) => <Card key={i} pokemon={pokemon} />)}
        </div>
      )}
      <div className='btn-group'></div>
    </>
  );
};

export default Pokedex;
