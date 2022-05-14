import React from 'react';

type HeaderProps = {
  filter(arg: string): void;
};

const Header: React.FC<HeaderProps> = ({ filter }) => {
  const handleChange = (e: { target: { value: string } }) => {
    filter(e.target.value);
  };
  return (
    <div className='header'>
      <h1>Pokemon App</h1>
      <div className='filter'>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Search here...'
          onChange={handleChange}
        />
        <label htmlFor='search'>
          <>&#x1F50D;</>
        </label>
      </div>
    </div>
  );
};

export default Header;
