import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  adicionarTodasCategorias,
  carregarCategorias,
} from "../reducers/categorias";
import categoriasService from "src/services/categorias-service";

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork }) => {
    const tarefa = fork(async (api) => {
      return await categoriasService.buscar();
    });

    const resposta = await tarefa.result;
    if (resposta.status === "ok") {
      dispatch(adicionarTodasCategorias(resposta.value));
    }
  },
});
