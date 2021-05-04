import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import Header from './Header';

function Gameboard() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [characters, setCharacters] = useState<Array<Info>>([]);
  const [list, setList] = useState<Array<Info>>([]);
  const [selected, setSelsected] = useState<Array<String>>([]);

  useEffect(() => {
    GetAnimeCharacter();
  }, []);

  const GetAnimeCharacter = async () => {
    const character = await fetch(
      'https://api.jikan.moe/v3/anime/40028/characters_staff'
    )
      .then((res) => res.json())
      .then((res) => res.characters.map((info: any) => formatFetch(info)));

    setCharacters(character);
    filterCharacters(character);
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

    setList(character.slice(0, numberOfCharacters));
  };

  const handleScore = () => {
    setScore(score + 1);

    if (score > bestScore) {
      setBestScore(score);
      console.log(bestScore);
    }
  };

  const handleChoice = (input: string) => {
    if (!selected.includes(input)) {
      setSelsected([...selected, input]);
      handleScore();
      console.log(score);
    } else {
      console.log('you lost');
    }
  };

  return (
    <main>
      <Header />
      <h1>Choose a character only once</h1>
      <Cards list={list} onClick={(input: string) => handleChoice(input)} />
    </main>
  );
}

interface Info {
  image: string;
  id: number;
  name: string;
}

export default Gameboard;
