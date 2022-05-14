import React from 'react';
import { useNavigate } from 'react-router-dom';

type CardProps = {
  pokemon: {
    id: number;
    sprites: {
      front_default: string;
    };
    name: string;
    fav: boolean;
  };
  favIcon: (arg: number) => void;
};

const Card = ({ pokemon, favIcon }: CardProps) => {
  const history = useNavigate();
  return (
    <div className='card'>
      <div className='number'>{pokemon.id}</div>
      <img
        src={pokemon.sprites.front_default}
        alt=''
        onClick={() => history(`/${pokemon.id}`)}
      />
      <h2>
        <span
          className={`fav-btn ${pokemon.fav ? 'fav' : ''}`}
          onClick={() => favIcon(pokemon.id)}
        >
          <>&hearts;</>
        </span>
        {pokemon.name.toUpperCase()}
      </h2>
    </div>
  );
};

export default Card;
