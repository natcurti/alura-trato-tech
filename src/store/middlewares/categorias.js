import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  adicionarUmaCategoria,
  carregarUmaCategoria,
} from "../reducers/categorias";
import criarTarefa from "./utils/criarTarefa";
import categoriasService from "src/services/categorias-service";

export const categoriasListener = createListenerMiddleware();

categoriasListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { dispatch, fork, getState, unsubscribe }) => {
    const { categorias } = getState();
    const nomeCategoria = action.payload;
    const categoriaCarregada = categorias.some(
      (categoria) => categoria.id === nomeCategoria
    );
    if (categoriaCarregada) return;
    if (categorias.length === 5) {
      return unsubscribe();
    }

    await criarTarefa({
      dispatch,
      fork,
      action: adicionarUmaCategoria,
      busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
      textoCarregando: `Carregando categoria ${nomeCategoria}`,
      textoSucesso: `Categoria ${nomeCategoria} carregada com sucesso.`,
      textoErro: `Erro ao buscar categoria ${nomeCategoria}`,
    });
  },
});
