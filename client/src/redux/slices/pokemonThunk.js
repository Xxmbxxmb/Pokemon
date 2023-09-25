import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPokemones = createAsyncThunk(
  "get/pokemones",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/pokemons");
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDetailsbyName = createAsyncThunk(
  "get/pokemonDetail",
  async (name, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/pokemons?name=${name}`);
        const data = response.data;
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);

export const getDetailsbyId = createAsyncThunk(
  "get/detailById",
  async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/pokemons/${id}`);
        const data = response.data;
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);

export const addPokemon = createAsyncThunk(
  "post/pokemon",
  async (pokemon, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/pokemons`, pokemon);
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
}
)
