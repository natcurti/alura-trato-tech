import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "src/services/categorias-service";

const estadoInicial = [];

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: estadoInicial,
  extraReducers: (builder) => {
    builder
      .addCase(buscarCategorias.fulfilled, (state, { payload }) => {
        console.log("categorias carregadas");
        return payload;
      })
      .addCase(buscarCategorias.pending, (state, { payload }) => {
        console.log("carregando categorias");
      })
      .addCase(buscarCategorias.rejected, (state, { payload }) => {
        console.log("busca rejeitada");
      });
  },
});

export default categoriasSlice.reducer;
