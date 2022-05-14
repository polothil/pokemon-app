import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Card from './Card';
import Loader from './Loader';

type Pokemons = {
  name: string;
  url: string;
};

type pokeDexProp = {
  name: string;
  id: number;
  fav: boolean;
  sprites: {
    front_default: string;
  };
};

const Pokedex: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<pokeDexProp[]>(
    JSON.parse(localStorage.getItem('pokeList')!) || []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredList, setFilteredList] = useState<pokeDexProp[]>([]);
  const [favorites, setfavorites] = useState<pokeDexProp[]>([]);
  const [showFav, setShowFav] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(pokemonData.length);
  const [y, setY] = useState<number>(window.scrollY);

  const handleNavigation = useCallback(
    (e: any) => {
      const window = e.currentTarget;
      if (y < window.scrollY) {
        // console.log('scrolling down');
        if (
          e.target.documentElement.scrollTop + window.innerHeight >=
            e.target.documentElement.scrollHeight &&
          !showFav
        ) {
          console.log('At the bottom');
          setOffset((prev) => prev + 30);
        }
      }
      setY(window.scrollY);
    },
    [y, showFav]
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
      let pokeList = JSON.parse(localStorage.getItem('pokeList')!) || [];
      try {
        console.log('API calling....');
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
        );
        res.data.results.forEach(async (result: Pokemons) => {
          try {
            const detailedRes = await axios.get(result.url);
            const pokeData = {
              name: detailedRes.data.name,
              id: detailedRes.data.id,
              fav: false,
              sprites: {
                front_default: detailedRes.data.sprites.front_default,
              },
            };
            pokeList = [...pokeList, pokeData];
            pokeList.sort((a: pokeDexProp, b: pokeDexProp) => (a.id > b.id ? 1 : -1));
            setPokemonData(pokeList);
            setLoading(false);
            localStorage.setItem('pokeList', JSON.stringify(pokeList));
          } catch (error) {
            console.log(error);
            alert('Error fetching data from server');
          }
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
      const newList: pokeDexProp[] = pokemonData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(filter.toLowerCase());
      });
      setFilteredList(newList);
    } else {
      setFilteredList(pokemonData);
    }
  };

  const toggleFav = (id: number) => {
    const result = pokemonData.filter((pokemon) => pokemon.id === id);
    result[0].fav = !result[0].fav;
    const favList = pokemonData.filter((pokemon) => pokemon.fav === true);
    setfavorites(favList);
  };

  const handleShowfav = () => {
    setShowFav((state) => !state);
  };

  return (
    <>
      <Header filter={handleFilter} fav={handleShowfav} showFav={showFav} />
      {loading ? (
        <Loader />
      ) : (
        <div className='container'>
          {showFav
            ? favorites.map((pokemon) => (
                <Card pokemon={pokemon} favIcon={toggleFav} key={pokemon.id} />
              ))
            : searchTerm.length < 1
            ? pokemonData.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} favIcon={toggleFav} />
              ))
            : filteredList.map((pokemon, i) => (
                <Card key={pokemon.id} pokemon={pokemon} favIcon={toggleFav} />
              ))}
          {/* {searchTerm.length < 1
            ? pokemonData.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} favIcon={toggleFav} />
              ))
            : filteredList.map((pokemon, i) => (
                <Card key={pokemon.id} pokemon={pokemon} favIcon={toggleFav} />
              ))} */}
        </div>
      )}
      <div className='btn-group'></div>
    </>
  );
};

export default Pokedex;
