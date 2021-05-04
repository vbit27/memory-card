import React from 'react';
import Cards from './Cards';
import Header from './Header';

function Gameboard() {
  return (
    <div>
      <Header />
      <h1>Choose a character only once</h1>
      <Cards />
    </div>
  );
}

export default Gameboard;
