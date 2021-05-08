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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelected([]);
    filterCharacters(characters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    if (list.length && list.length === selected.length) {
      setLevel((prevLevel) => prevLevel + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (score === 35) {
    <div className="start-container">
      <div className="button-container">
        <h1>YOU WON!!!!</h1>
        <button onClick={handleStartGame}>Restart Game</button>
      </div>
    </div>;
  }

  if (!playing && score) {
    return (
      <div className="start-container">
        <div className="button-container">
          <h1>You Lost</h1>
          <h3>Your Score: {score}</h3>
          <h3>Level: {level}</h3>
          <button onClick={handleStartGame}>Restart Game</button>
        </div>
      </div>
    );
  }

  if (!playing) {
    return (
      <div className="start-container">
        <div className="button-container">
          <h1>Start Game</h1>
          <ul>
            Game Rules:
            <li>Pick a card only once</li>
            <li>When you pick all cards, you go to the next level</li>
            <li>If you choose the same card twice, you lose</li>
          </ul>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Header level={level} score={score} bestScore={bestScore} />
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
