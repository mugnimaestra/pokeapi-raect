import React, { useEffect, useState, useCallback } from "react";
import styled from 'styled-components';
import { getPokemonsList, getByResources, getTypesList } from '../lib/api';
import PokemonItem from '../components/PokemonItem';
import LoadMore from "./LoadMore";

const PokemonGridStyle = styled.div`
  .pokemon-container {
    max-width: 720px;
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: center;
  }
`;

const PokemonGrid = () => {
  const [pokemonsNameList, setPokemonsNameList] = useState([]);
  const [pokemonsDetailsList, setPokemonsDetailsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState("No filter");
  const [typesList, setTypesList] = useState([]);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
  });

  // initial data
  useEffect(() => {
    const getFirstData = async () => {
      await getPokemonsList().then((res) => {
        setPagination({
          next: res.next,
          previous: res.previous,
        });
        setPokemonsNameList(res.results);
      });
    };
    const getAllTypes = async () => {
      await getTypesList().then(res => {
        setTypesList(res.results);
      })
    }
    getAllTypes();
    getFirstData();
  }, []);

  useEffect(() => {
    const getResources = async () => {
      const pokemonNameList = pokemonsNameList.map((pokemon) => pokemon.url);
      if (pokemonNameList.length > 0) {
        await getByResources(pokemonNameList).then((res) =>
          {
            setPokemonsDetailsList(res);
          }
        );
      }
    };
    getResources();
  }, [pokemonsNameList]);

  const filteredPokemonDetailsList =
    pokemonsDetailsList.length > 0 && filterType !== "No filter"
      ? pokemonsDetailsList.filter((pokemon) => {
          if (filterType === "No filter") return pokemon;
          return pokemon.types.some((type) => type.type.name === filterType);
        })
      : pokemonsDetailsList;

  const getNextPage = async () => {
    setIsLoading(true);
    if (pagination.next) {
      await getByResources([pagination.next]).then(res => {
        setPagination({
          next: res[0].next,
          previous: res[0].previous,
        });
        setPokemonsNameList([
          ...pokemonsNameList,
          ...res[0].results
        ])
        setIsLoading(false);
      });
    }
  };

  const handleFilter = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <PokemonGridStyle>
      <div>Filter by type:</div>
      <select defaultValue="No filter" onChange={(e) => handleFilter(e)}>
        <option >No filter</option>
        {typesList.map((type) => (
          <option key={type.name}>{type.name}</option>
        ))}
      </select>
      <div className="pokemon-container">
        {filteredPokemonDetailsList.map((pokemon) => {
          return (
            <PokemonItem
              key={pokemon.name}
              name={pokemon.name}
              types={pokemon.types}
              sprite={pokemon.sprites.front_default}
            />
          );
        })}
      </div>
      {pagination.next && <LoadMore isLoading={isLoading} getNextPage={getNextPage} />}
    </PokemonGridStyle>
  );
}

export default PokemonGrid;