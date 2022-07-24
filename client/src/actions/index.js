const axios = require("axios");

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const GET_FILTER = "GET_FILTER";
export const CREATE_POKEMON = "CREATE_POKEMON";

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


// export function addPokemon(pokemon) {
//     return function(dispatch){
//         return axios.post("http://localhost:3001/pokemons", pokemon)
//         .then((resp) => {
//             dispatch({
//                 type: CREATE_POKEMON,
//                 payload: resp.data
//             })
//         })
//         .catch((err) => console.error(err));
//     }
// }

export function addPokemon(pokemon) {
    return async function(dispatch){
        return await axios.post("/pokemons", pokemon)
    }
}



