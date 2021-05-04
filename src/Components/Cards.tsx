import React, { FC } from 'react';

const Cards: FC<Prop> = (prop) => {
  return (
    <div className="card-list">
      {prop.characters.map((char) => {
        return (
          <div key={char.id} className="card-container">
            <img src={char.image} alt={char.name} />
            <h4>{char.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

interface Prop {
  characters: Info[];
}

interface Info {
  image: string;
  id: number;
  name: string;
}

export default Cards;
