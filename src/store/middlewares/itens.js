import { createListenerMiddleware } from "@reduxjs/toolkit";
import { carregarUmaCategoria } from "../reducers/categorias";
import criarTarefa from "./utils/criarTarefa";
import itensService from "src/services/itens-service";
import { adicionarItens } from "../reducers/itens";

export const itensListener = createListenerMiddleware();

itensListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { dispatch, fork, getState, unsubscribe }) => {
    const { itens } = getState();
    const nomeCategoria = action.payload;

    const itensCarregados = itens.some(
      (item) => item.categoria === nomeCategoria
    );
    if (itensCarregados) return;
    if (itensCarregados.length === 25) {
      return unsubscribe();
    }

    await criarTarefa({
      dispatch,
      fork,
      action: adicionarItens,
      busca: () => itensService.buscarItensDeCategorias(nomeCategoria),
      textoCarregando: `Carregando itens da categoria ${nomeCategoria}`,
      textoSucesso: `Itens da categoria ${nomeCategoria} carregados com sucesso.`,
      textoErro: "Erro ao buscar itens.",
    });
  },
});
