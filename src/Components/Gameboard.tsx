import React from 'react';
import Cards from './Cards';
import Header from './Header';

function Gameboard() {
  return (
    <main>
      <Header />
      <h1>Choose a character only once</h1>
      <Cards />
    </main>
  );
}

export default Gameboard;
