import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  adicionarTodasCategorias,
  carregarCategorias,
  carregarUmaCategoria,
} from "../reducers/categorias";
import criarTarefa from "./utils/criarTarefa";
import categoriasService from "src/services/categorias-service";

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    await criarTarefa({
      dispatch,
      fork,
      action: adicionarTodasCategorias,
      busca: categoriasService.buscar,
      textoCarregando: "Carregando categorias",
      textoSucesso: "Categorias carregadas com sucesso.",
      textoErro: "Erro ao buscar categorias",
    });
    unsubscribe();
  },
});

listener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async () => {
    console.log("carregar apenas uma categoria.");
  },
});
