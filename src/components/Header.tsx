import React, { MouseEventHandler } from 'react';

type HeaderProps = {
  filter(arg: string): void;
  fav: MouseEventHandler<HTMLButtonElement>;
  showFav: boolean;
};

const Header: React.FC<HeaderProps> = ({ filter, fav, showFav }) => {
  const handleChange = (e: { target: { value: string } }) => {
    filter(e.target.value);
  };
  return (
    <div className='header'>
      <h1>
        <span>
          <img
            src='https://cdn.icon-icons.com/icons2/896/PNG/512/pokemon_go_play_game_cinema_film_movie_icon-icons.com_69163.png'
            alt=''
            style={{ height: '40px', marginRight: '20px', marginBottom: '-10px' }}
          />
        </span>
        Pokemon App
      </h1>
      <div className='filter'>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Search here...'
          onChange={handleChange}
          disabled={showFav}
        />
        <label htmlFor='search'>
          <>&#x1F50D;</>
        </label>
        <button onClick={fav}>{showFav ? 'Show All' : 'Show Favorites'}</button>
      </div>
    </div>
  );
};

export default Header;
