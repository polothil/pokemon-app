import React from 'react';

const Header = () => {
  return (
    <div className='header'>
      <input type='text' name='search' id='search' placeholder='Search here...' />
      <label htmlFor='search'>
        <>&#x1F50D;</>
      </label>
    </div>
  );
};

export default Header;
