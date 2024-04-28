import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "src/services/categorias-service";
import { createStandaloneToast } from "@chakra-ui/react";
import { resetarCarrinho } from "./carrinho";

const { toast } = createStandaloneToast();

export const carregarCategorias = createAction("categorias/carregarCategorias");
export const carregarUmaCategoria = createAction(
  "categorias/carregarUmaCategoria"
);

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: [],
  reducers: {
    adicionarTodasCategorias: (state, { payload }) => {
      return payload;
    },
    adicionarUmaCategoria: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetarCarrinho.type, () => {
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

export const { adicionarTodasCategorias, adicionarUmaCategoria } =
  categoriasSlice.actions;

export default categoriasSlice.reducer;
