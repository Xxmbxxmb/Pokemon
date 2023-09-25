import { createSlice } from "@reduxjs/toolkit";
import { getPokemones, getDetailsbyId, getDetailsbyName } from "./pokemonThunk";

const initialState = {
  pokemones: [],
  pokemon_detail: {},
  filtrado: [],
  loading: false,
  error: "",
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    filtradoAtt: (state, action) => {
      state.filtrado = state.filtrado.sort((a, b) =>
        a.attack > b.attack ? 1 : -1
      );
      if (action.payload) state.filtrado = state.filtrado.reverse();
    },
    filtradoName: (state, action) => {
      state.filtrado = state.filtrado.sort((a, b) =>
        a.nombre > b.nombre ? 1 : -1
      );
      if (action.payload) state.filtrado = state.filtrado.reverse();
    },
    filtradoOrigen: (state, action) => {
      if (action.payload === "originales")
        state.filtrado = state.pokemones.filter(
          (p, i) => typeof p.id === "number"
        );
      else if (action.payload === "creados")
        state.filtrado = state.pokemones.filter(
          (p) => typeof p.id !== "number"
        );
      else state.filtrado = [...state.pokemones];
    },
    filtradoTipo: (state, action) => {
      state.filtrado = state.pokemones.filter((p) =>
        p.types.includes(action.payload)
      );
    },
    setPokemonDetail: (state, action) => {
      state.pokemon_detail = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Get Pokemons
    builder.addCase(getPokemones.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemones = [...action.payload];
      state.filtrado = [...action.payload];
    });
    builder.addCase(getPokemones.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getPokemones.pending, (state) => {
      state.loading = true;
    });

    // Pokemon Detail by name
    builder.addCase(getDetailsbyName.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemon_detail = action.payload;
    });
    builder.addCase(getDetailsbyName.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getDetailsbyName.pending, (state) => {
      state.loading = true;
    });

    // Pokemon Detail by id
    builder.addCase(getDetailsbyId.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemon_detail = action.payload;
    });
    builder.addCase(getDetailsbyId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getDetailsbyId.pending, (state) => {
      state.loading = true;
    });
  },
});

export const {
  filtradoAtt,
  filtradoName,
  filtradoOrigen,
  filtradoTipo,
  setPokemonDetail,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
