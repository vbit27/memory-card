import React, { useEffect, useState } from 'react';
import { parseJsonSourceFileConfigFileContent } from 'typescript';
import Cards from './Cards';
import Header from './Header';

function Gameboard() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [characters, setCharacters] = useState<Array<Info>>([]);

  const GetAnimeCharacter = async () => {
    const character = await fetch(
      'https://api.jikan.moe/v3/anime/40028/characters_staff'
    )
      .then((res) => res.json())
      .then((res) => res.characters.map((info: any) => formatFetch(info)));

    setCharacters(character);
  };

  const formatFetch = (input: any): Info => {
    return {
      image: input.image_url,
      id: input.mal_id,
      name: input.name,
    };
  };

  const filterCharacters = (character: Info[]) => {
    const numberOfCharacters = level * 4;

    setCharacters(character.slice(0, numberOfCharacters));
  };

  useEffect(() => {
    GetAnimeCharacter();
  }, []);

  console.log(characters);

  return (
    <main>
      <Header />
      <h1>Choose a character only once</h1>
      <Cards characters={characters} />
    </main>
  );
}

interface Info {
  image: string;
  id: number;
  name: string;
}

export default Gameboard;
