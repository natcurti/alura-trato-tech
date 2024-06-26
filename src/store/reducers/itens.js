import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itensService from "src/services/itens-service";

export const buscarItens = createAsyncThunk(
  "itens/buscar",
  itensService.buscar
);

const itensSlice = createSlice({
  name: "itens",
  initialState: [],
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    cadastrarItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    mudarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    deletarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
    adicionarItens: (state, { payload }) => {
      state.push(...payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarItens.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const {
  mudarFavorito,
  cadastrarItem,
  mudarItem,
  deletarItem,
  adicionarItens,
} = itensSlice.actions;

export default itensSlice.reducer;
