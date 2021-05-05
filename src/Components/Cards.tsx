import React, { FC } from 'react';

const Cards: FC<Prop> = (props) => {
  const shuffleArray = (array: Array<Info>) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  shuffleArray(props.list);

  const handleClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void = (e) => {
    props.onClick(e.currentTarget.id);
  };
  return (
    <div className="card-list">
      {props.list.map((char) => {
        return (
          <div
            key={char.id}
            id={char.id.toString()}
            className="card-container"
            onClick={handleClick}
          >
            <img src={char.image} alt={char.name} />
            <h4>{char.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

interface Prop {
  list: Info[];
  onClick: (input: string) => void;
}

interface Info {
  image: string;
  id: number;
  name: string;
}

export default Cards;
