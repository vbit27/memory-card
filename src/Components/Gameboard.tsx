import React, { FC, useEffect, useState } from 'react';
import Cards from './Cards';
import Header from './Header';

const Gameboard: FC = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [characters, setCharacters] = useState<Array<Info>>([]);
  const [list, setList] = useState<Array<Info>>([]);
  const [selected, setSelected] = useState<Array<String>>([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    GetAnimeCharacter();
  }, []);

  useEffect(() => {
    setSelected([]);
    filterCharacters(characters);
  }, [level]);

  useEffect(() => {
    if (list.length && list.length === selected.length) {
      setLevel((prevLevel) => prevLevel + 1);
    }
  }, [selected]);

  // Fetch data from API
  const GetAnimeCharacter = async () => {
    const character = await fetch(
      'https://api.jikan.moe/v3/anime/40028/characters_staff'
    )
      .then((res) => res.json())
      .then((res) => res.characters.map((info: any) => formatFetch(info)));

    setCharacters(character);
    filterCharacters(character);
  };

  //Filter the data from API
  const formatFetch = (input: any): Info => {
    return {
      image: input.image_url,
      id: input.mal_id,
      name: input.name,
    };
  };

  const handleStartGame = () => {
    clearScore();
    setPlaying(true);
  };

  //Set number of characters based on level
  const filterCharacters = (character: Info[]) => {
    const shuffled = character.sort(() => 0.5 - Math.random());

    const choices = level * 4;

    setList(shuffled.slice(0, choices));
  };

  // Handle Scores
  const handleScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const handleBestScore = () => {
    if (score > bestScore) {
      setBestScore(score);
    }
  };

  //Handle players choices
  const handleChoice = (input: string) => {
    if (!selected.includes(input)) {
      setSelected([...selected, input]);
      handleScore();
    } else {
      handleBestScore();
      setPlaying(false);
    }
  };

  const clearScore = () => {
    setScore(0);
    setLevel(1);
    setSelected([]);
  };

  if (!playing && score) {
    return (
      <div>
        <h1>You Lost</h1>
        <h2>Your Score: {score}</h2>
        <h2>You reached level: {level}</h2>
        <button onClick={handleStartGame}>Restart Game</button>
      </div>
    );
  }

  if (!playing) {
    return (
      <div>
        <h1>Start Game</h1>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    );
  }

  return (
    <main>
      <Header level={level} score={score} bestScore={bestScore} />
      <h1>Choose a character only once</h1>
      <Cards list={list} onClick={(input: string) => handleChoice(input)} />
    </main>
  );
};

interface Info {
  image: string;
  id: number;
  name: string;
}

export default Gameboard;
