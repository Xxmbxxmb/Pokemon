const axios = require("axios");

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const GET_FILTER = "GET_FILTER";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const FILTER_ATT = "FILTER_ATT";
export const FILTER_ALTURA = "FILTER_ALTURA"
export const FILTER_NAME = "FILTER_NAME"
export const FILTER_ORIGINAL = "FILTER_ORIGINAL"
export const FILTER_CREADOS = "FILTER_CREADOS"
export const FILTER_TIPOS = "FILTER_TIPOS"

export function getPokemons() {
  return function (dispatch) {
    return axios.get("/pokemons")
      .then((request) => request.data)
      .then((data) => {
        dispatch({
          type: GET_POKEMONS,
          payload: data,
        });
      });
  };
}

export function getDetailsbyName(name) {
  return function (dispatch) {
    return axios.get(`/pokemons?name=${name}`)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch({
          type: GET_DETAILS,
          payload: data,
        });
      });
  };
}

export function getDetailsbyId(id) {
  return function (dispatch) {
    return axios.get(`/pokemons/${id}`)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch({
          type: GET_DETAILS,
          payload: data,
        });
      });
  };
}


export function getDetailsbyDB(id){
  return function(dispatch){
    return axios.get(`/pokemons/${id}`)
    .then(resp => resp.data)
    .then(data => {
      dispatch({
        type: GET_DETAILS,
        payload: data
      })
    })
  }
}


export function getFilterPaginado(lista){
  return function(dispatch){
      dispatch({
        type: GET_FILTER,
        payload: lista
      })
    }
  }

export function filtradoAlt (){
  return {
      type: FILTER_ALTURA
    }
  }

export function filtradoAtt(reverse, tipo){
  return {
    type: FILTER_ATT,
    payload: reverse,
    tipo: tipo
  }
}

export function filtradoName(reverse, tipo){
  return {
    type: FILTER_NAME,
    payload: reverse,
    tipo: tipo
  }
}

export function filtradoOriginales(tipo){
  return {
    type: FILTER_ORIGINAL,
    tipo: tipo
  }
}

export function filtradoCreados(tipo){
  return {
    type: FILTER_CREADOS,
    tipo: tipo
  }
}

export function filtradoTipo(tipo){
  return {
    type: FILTER_TIPOS,
    payload: tipo
  }
}

export function addPokemon(pokemon){
  return async function(dispatch){
    let nuevo = await axios.post("/pokemons", pokemon)
    dispatch({
      type: CREATE_POKEMON,
      payload: nuevo
    })
  }
}

export function agregarPokemon(pokemon) {
    return async function(dispatch){
        return await axios.post("/pokemons", pokemon)
    }
}



