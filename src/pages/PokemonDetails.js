import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPokemonByName } from '../lib/api';

const PokemonDetailsStyle = styled.div`
  border: 1px solid #000;
  width: 600px;
  min-height: 300px;
  margin: 3rem auto;
  .moves-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    li {
      flex: 1 1 20%; /*grow | shrink | basis */
      height: 50px;
    }
  }
`;

const PokemonDetails = ({ match: { params: { _name } }}) => {
  const [pokemonData, setPokemonData] = useState({});
  useState(() => {
    const getPokemonDetails = async () => {
      await getPokemonByName(_name).then(res => {
        setPokemonData(res);
      })
    }
    getPokemonDetails();
  }, []);

  const { name, id, types, moves, height, weight } = pokemonData;

  const typeName = types ? types.map((pokemon) => pokemon.type.name) : null;

  const listOfMoves = moves ? moves.map((pokemon) => pokemon?.move?.name) : null;

  return (
    <>
      <Link to="/">Go Back</Link>
      {Object.keys(pokemonData).length > 0 && (
        <PokemonDetailsStyle>
          <br />
          <div>Name: {name}</div>
          <div>ID: {id}</div>
          <div>Height: {height * 10}cm</div>
          <div>Weight: {weight / 10}kg</div>
          <div>Type: {typeName.join(", ")}</div>
          <br />
          <div>List of sprites:</div>
          {Object.entries(pokemonData.sprites).map((sprite) => {
            if (sprite[1]) {
              return <img key={sprite[0]} src={sprite[1]} alt="sprite" />;
            }
            return <React.Fragment key={sprite[0]}></React.Fragment>;
          })}
          <div>
            List of {name} moves ({listOfMoves.length}):
          </div>
          <div className="moves-container">
            {listOfMoves.map((move) => (
              <li>{move}</li>
            ))}
          </div>
        </PokemonDetailsStyle>
      )}
    </>
  );
}

export default PokemonDetails;