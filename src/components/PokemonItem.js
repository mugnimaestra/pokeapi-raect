import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PokemonItemStyle = styled.div`
  border: 1px solid #000;
  width: 150px;
  height: 170px;
  padding: 1rem;
  margin: 1rem;
  transition: box-shadow ease-in-out 0.3s;
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 0px 0px #000;
  }
  a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
`;

const PokemonItem = ({ name, types, sprite }) => {
  const typeName = types.map(pokemon => pokemon.type.name);
  return (
    <PokemonItemStyle>
      <div>Pokemon Name: {name}</div>
      <div>Pokemon Type: {typeName.join(", ")} </div>
      <img src={sprite} alt="default-sprite" />
      <Link to={`/pokemon/${name}`}>Go to pokemon page</Link>
    </PokemonItemStyle>
  );
}

export default PokemonItem;