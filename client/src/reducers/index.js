import { GET_POKEMONS, GET_DETAILS, CREATE_POKEMON, GET_FILTER, FILTER_ALTURA, FILTER_ATT, FILTER_NAME, FILTER_ORIGINAL, FILTER_CREADOS, FILTER_TIPOS } from "../actions/index";

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

    case FILTER_ATT:
      let lista_att = [...state.pokemones];
      if(action.tipo !== '') lista_att = lista_att.filter(p => p.types.includes(action.tipo))
      lista_att.sort((a, b) => {
        if(a.attack > b.attack) return 1;
        if(a.attack < b.attack) return -1;
        return 0;
      })
      if(action.payload) lista_att.reverse()
      return {
        ...state,
        filtrado: [...lista_att]
      }

    case FILTER_NAME:
      let lista_nombre = [...state.pokemones];
      if(action.tipo !== '') lista_nombre = lista_nombre.filter(p => p.types.includes(action.tipo))
      lista_nombre.sort((a, b) => {
        if(a.nombre > b.nombre) return 1;
        if(a.nombre < b.nombre) return -1;
        return 0;
      })
      if(action.payload) lista_nombre.reverse()
      return {
        ...state,
        filtrado: [...lista_nombre]
      }

    case FILTER_ALTURA:
      let resultado = state.pokemones.filter(p => p.attack >= 80)
      return{
        ...state,
        filtrado: [...resultado]
      }

    case FILTER_ORIGINAL:
      let originales = [...state.pokemones];
      if(action.tipo !== '') originales = originales.filter(p => p.types.includes(action.tipo))
      originales = originales.filter(p => typeof p.id === 'number')
      return {
        ...state,
        filtrado: [...originales]
      }

      case FILTER_CREADOS:
        let creados = [...state.pokemones];
        if(action.tipo !== '') creados = creados.filter(p => p.types.includes(action.tipo))
        creados = creados.filter(p => typeof p.id !== 'number')
        return {
          ...state,
          filtrado: [...creados]
        }

      case FILTER_TIPOS:
        let filter = [...state.pokemones];
        filter = filter.filter(p => p.types.includes(action.payload))
        return {
          ...state,
          filtrado: [...filter]
        }
  }
}
