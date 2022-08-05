import { GET_POKEMONS, GET_DETAILS, CREATE_POKEMON, GET_FILTER, FILTER_ALTURA } from "../actions/index";

const initialState = {
  pokemones: [],
  pokemon_detail: {},
  filtrado: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;

    case GET_POKEMONS:
      return {
        ...state,
        pokemones: state.pokemones.concat(action.payload),
      };

    case GET_DETAILS:
      return {
        ...state,
        pokemon_detail: action.payload,
      };

    case CREATE_POKEMON:
      return {
        ...state,
        pokemones: [...state.pokemones, action.payload]
      }

    case GET_FILTER:
      return {
        ...state,
        filtrado: [...action.payload]

      }

    case FILTER_ALTURA:
      let resultado = state.pokemones.filter(p => p.attack > 80)
      return{
        ...state,
        pokemones: [...resultado]
      }
  }
}
