import React, { FC } from 'react';

const Header: FC<Props> = (props) => {
  return (
    <header>
      <div className="level">
        <h2>Level: {props.level}</h2>
      </div>
      <div className="score-container">
        <div className="score">Score: {props.score}</div>
        <div className="best-score">Best Score: {props.bestScore}</div>
      </div>
    </header>
  );
};

interface Props {
  score: number;
  bestScore: number;
  level: number;
}

export default Header;
