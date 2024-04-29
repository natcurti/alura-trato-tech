import { call, put, delay, takeLatest } from "redux-saga/effects";
import {
  adicionarTodasCategorias,
  carregarCategorias,
} from "../reducers/categorias";
import { createStandaloneToast } from "@chakra-ui/react";
import categoriasService from "src/services/categorias-service";

const { toast } = createStandaloneToast();

function* observarCategorias() {
  yield console.log("observando.");
  toast({
    title: "Carregando",
    description: "Carregando categorias",
    duration: 500,
    isClosable: true,
    status: "loading",
  });
  try {
    yield delay(1000);
    const categorias = yield call(categoriasService.buscar);
    console.log(categorias);
    yield put(adicionarTodasCategorias(categorias));
    toast({
      title: "Sucesso!",
      description: "Categorias carregadas com sucesso.",
      duration: 1000,
      isClosable: true,
      status: "success",
    });
  } catch (error) {
    toast({
      title: "Erro",
      description: "Erro ao buscar categorias.",
      duration: 500,
      isClosable: true,
      status: "error",
    });
  }
}

export function* categoriasSaga() {
  const tarefa = yield takeLatest(carregarCategorias, observarCategorias);
  yield takeLatest(adicionarTodasCategorias, () => tarefa.cancel());
}
