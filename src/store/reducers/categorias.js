import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "src/services/categorias-service";
import { createStandaloneToast } from "@chakra-ui/react";
import { resetarCarrinho } from "./carrinho";

const { toast } = createStandaloneToast();

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: [],
  extraReducers: (builder) => {
    builder
      .addCase(buscarCategorias.fulfilled, (state, { payload }) => {
        toast({
          title: "Sucesso!",
          description: "Categorias carregadas com sucesso.",
          duration: 1000,
          isClosable: true,
          status: "success",
        });
        return payload;
      })
      .addCase(buscarCategorias.pending, (state, { payload }) => {
        toast({
          title: "Carregando",
          description: "Carregando categorias",
          duration: 500,
          isClosable: true,
          status: "loading",
        });
      })
      .addCase(buscarCategorias.rejected, (state, { payload }) => {
        toast({
          title: "Erro",
          description: "Erro ao buscar categorias",
          duration: 500,
          isClosable: true,
          status: "error",
        });
      })
      .addCase(resetarCarrinho.type, () => {
        toast({
          title: "Sucesso",
          description: "Compra completada",
          duration: 500,
          isClosable: true,
          status: "success",
        });
      });
  },
});

export default categoriasSlice.reducer;
