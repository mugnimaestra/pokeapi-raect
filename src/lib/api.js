// import { Pokedex } from 'pokeapi-js-wrapper';
// import axios from 'axios';
const Pokedex = require('pokeapi-js-wrapper');

const config = {
  protocol: "https",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
};
const P = new Pokedex.Pokedex(config);

const defaultOptions = {
  limit: 21,
}

export const getPokemonsList = (options = defaultOptions) => P.getPokemonsList(options);

export const getByResources = (array = []) => P.resource(array);

export const getPokemonByName = (name) => P.getPokemonByName(name);

export const getTypesList = () => P.getTypesList();