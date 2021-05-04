import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import Header from './Header';

function Gameboard() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [characters, setCharacters] = useState([]);

  const GetAnimeCharacter = async () => {
    const character = await fetch(
      'https://api.jikan.moe/v3/anime/40028/characters_staff'
    ).then((res) => res.json());

    console.log(character);
    filterCharacters(character.characters);
  };

  const filterCharacters = (characters: any) => {
    const numberOfCharacters = level * 4;

    setCharacters(characters.slice(0, numberOfCharacters));
  };

  useEffect(() => {
    GetAnimeCharacter();
  }, []);

  console.log(characters);

  return (
    <main>
      <Header />
      <h1>Choose a character only once</h1>
      <Cards />
    </main>
  );
}

/*

const formatFetch = (input: any): Info => {
  return {
    image: input.image_url,
    id: input.mal_id,
    name: input.name,
  };
};

interface Info {
  image: string;
  id: number;
  name: string;
}

*/
export default Gameboard;
