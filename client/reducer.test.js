import rootReducer from './src/reducers/index';
import { GET_POKEMONS, GET_DETAILS, CREATE_POKEMON } from './src/actions';
import * as data from './data_test.json';

describe('Reducer', () => {
    const state = {
        pokemones: [],
        pokemon_detail: {},
        filtrado: []
    }

    it('Deberia retornar el estado inicial si no se pasa un type valido', () => {
        expect(rootReducer(undefined, [])).toEqual({
            pokemones: [],
            pokemon_detail: {},
            filtrado: []
        })
    })

    it('Debería guardar en nuestro state los pokemones obtenidos de nuestro llamado al back cuando action type es "GET_POKEMONS"', () => {
        const result = rootReducer(state, {
           type: GET_POKEMONS,
           payload: data.pokemons,
        });
        // Acuerdense que el state inicial no tiene que mutar!
        expect(result).not.toEqual(state);
        expect(result).toEqual({
           pokemones: data.pokemons, // Cuando ejecutes los tests, vas a ver bien lo que espera que le llegue a nuestro estado!
           pokemon_detail: {},
           filtrado: []
        });
     });

     it('Debería guardar en nuestro state los detalles del pokemon obtenido de nuestro llamado al back cuando action type es "GET_DETAILS"', () => {
        const result = rootReducer(state, {
           type: GET_DETAILS,
           payload: data.pokemons[0],
        });
        // Acuerdense que el state inicial no tiene que mutar!
        expect(result).not.toEqual(state);
        expect(result).toEqual({
           pokemones: [],
           pokemon_detail: data.pokemons[0],
           filtrado: []
        });
     });

     it('Debería crear un nuevo pokemon y guardarlo en nuestro estado de productos cuando action type es "CREATE_POKEMON"', () => {
        const state = {
           pokemones: data.pokemons,
           pokemon_detail: {},
           filtrado: []
        };
  
        const payload1 = {
            id : 49,
            nombre : "payload1",
            hp : 77,
            attack : 78,
            defense : 79,
            imagenStatic : 'imagen_estatica',
            imagen : 'imagen_gif',
            types : ['agua', 'shadow'],
        };
  
        const payload2 = {
            id : 50,
            nombre : "payload2",
            hp : 1,
            attack : 2,
            defense : 3,
            imagenStatic : 'imagen_estatica',
            imagen : 'imagen_gif',
            types : ['dragon', 'fire'],
        };
  
        const allProductsType1 = [
           ...data.pokemons,
           {
            id : 49,
            nombre : "payload1",
            hp : 77,
            attack : 78,
            defense : 79,
            imagenStatic : 'imagen_estatica',
            imagen : 'imagen_gif',
            types : ['agua', 'shadow'],
           },
        ];
        const allProductsType2 = [
           ...allProductsType1,
           {
            id : 50,
            nombre : "payload2",
            hp : 1,
            attack : 2,
            defense : 3,
            imagenStatic : 'imagen_estatica',
            imagen : 'imagen_gif',
            types : ['dragon', 'fire'],
           },
        ];
        const firstPoke = rootReducer(state, {
            type: CREATE_POKEMON,
            payload: payload1
        })
        const secondPoke = rootReducer({ ...state, pokemones: allProductsType1 },{
            type: CREATE_POKEMON,
            payload: payload2
        }
        );
  
        // Acuerdense que el state inicial no tiene que mutar!
        expect(firstPoke).not.toEqual(state);
        expect(secondPoke).not.toEqual(state);
  
        expect(firstPoke).toEqual({
           pokemon_detail: {},
           pokemones: allProductsType1,
           filtrado: []
        });
        expect(secondPoke).toEqual({
           pokemon_detail: {},
           pokemones: allProductsType2,
           filtrado: []
        });
     });
})