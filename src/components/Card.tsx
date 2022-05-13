import React from 'react';
import { useNavigate } from 'react-router-dom';

type CardProps = {
  pokemon: {
    id: number;
    sprites: {
      front_default: string;
    };
    name: string;
  };
};

const Card = ({ pokemon }: CardProps) => {
  const history = useNavigate();
  return (
    <div className='card' onClick={() => history(`/${pokemon.id}`)}>
      <img src={pokemon.sprites.front_default} alt='' />
      <h2>
        {pokemon.id}. {pokemon.name.toUpperCase()}
      </h2>
    </div>
  );
};

export default Card;
