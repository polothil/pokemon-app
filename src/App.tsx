import { Routes, Route } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Pokedex />} />
      <Route path='/:pokemonId' element={<Pokemon />} />
    </Routes>
  );
}

export default App;
