import React from "react";

interface CardProps {
  name: string;
  onButtonClick: () => void;
}

const Card = ({ name, onButtonClick }: CardProps) => {
  return (
    <div className="border-2 border-blue-600">
      <h2>{name}</h2>
      <button className="bg-lime-600 rounded-full p-2" onClick={onButtonClick}>
        Add a "J" to the name
      </button>
    </div>
  );
};

export default Card;
