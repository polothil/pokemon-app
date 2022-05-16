import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

export type PokemonProp = {
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

const Pokemon: React.FC = () => {
  const history = useNavigate();
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState<PokemonProp | undefined | null>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemon(res.data);
      } catch (error) {
        console.log(error);
        // alert('Error fetching data from server');
        setPokemon(null);
      }
    };
    fetchData();
  }, [pokemonId]);

  const renderPokemon = () => {
    if (pokemon === undefined) {
      return <Loader />;
    } else if (pokemon) {
      return (
        <>
          <h1>
            {pokemon.id}. {pokemon.name}
          </h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt=''
          />
          <div className='abilities'>
            {pokemon.abilities &&
              pokemon.abilities.map((item: any) => {
                return (
                  <div className='group' key={item.ability.name}>
                    <h2>{item.ability.name.toUpperCase()}</h2>
                  </div>
                );
              })}
          </div>
          <div className='basic-stat'>
            {pokemon.stats &&
              pokemon.stats.map((item: any) => (
                <h3 key={item.stat.name.toUpperCase()}>
                  {item.stat.name.toUpperCase()} : {item.base_stat}
                </h3>
              ))}
          </div>
        </>
      );
    } else {
      return <h2>Pokemon not found</h2>;
    }
  };

  return (
    <div className='content'>
      {renderPokemon()}
      {pokemon !== undefined && (
        <div className='btn-group'>
          <button onClick={() => history(`/`)}>Back to home</button>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
