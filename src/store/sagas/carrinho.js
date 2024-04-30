import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  carregarPagamento,
  finalizarPagamento,
  mudarCarrinho,
  mudarQuantidade,
  mudarTotal,
  resetarCarrinho,
} from "../reducers/carrinho";
import usuariosService from "src/services/usuarios";
import cartoesService from "src/services/cartoes";
import bandeirasService from "src/services/bandeiras";
import { adicionarUsuario } from "../reducers/usuario";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const usuarioLogado = 1;

function* carregarPagamentoSaga() {
  try {
    const usuario = yield call(usuariosService.buscarPorId, usuarioLogado);
    const cartoes = yield call(cartoesService.buscarPorId, usuarioLogado);
    const bandeirasIds = cartoes.map((cartao) => cartao.bandeiraId);
    const bandeiras = yield call(bandeirasService.buscarPorId, bandeirasIds);
    const cartoesComBandeiras = cartoes.map((cartao) => {
      const bandeiraDoCartao = bandeiras.find(
        (bandeira) => Number(bandeira.id) === cartao.bandeiraId
      );
      return {
        ...cartao,
        taxa: bandeiraDoCartao.taxa,
        bandeira: bandeiraDoCartao.nome,
      };
    });
    yield put(adicionarUsuario({ ...usuario, cartoes: cartoesComBandeiras }));
  } catch (error) {
    console.log(error);
  }
}

function* calcularTotal() {
  yield delay(500);
  const state = yield select();
  const total = state.carrinho.data.reduce((total, itemNoCarrinho) => {
    const item = state.itens.find((item) => item.id === itemNoCarrinho.id);
    return (total += item.preco * itemNoCarrinho.quantidade);
  }, 0);
  yield put(mudarTotal(total));
}

function* finalizarPagamentoSaga({ payload }) {
  const { valorTotal, formaDePagamento } = payload;
  if (valorTotal > formaDePagamento.saldo) {
    return yield toast({
      title: "Erro",
      description: "Saldo insuficiente.",
      duration: 500,
      isClosable: true,
      status: "error",
    });
  } else {
    yield toast({
      title: "Sucesso!",
      description: "Pagamento feito com sucesso.",
      duration: 1000,
      isClosable: true,
      status: "success",
    });
    yield put(resetarCarrinho);
  }
}

export function* carrinhoSaga() {
  yield takeLatest(carregarPagamento, carregarPagamentoSaga);
  yield takeEvery([mudarQuantidade, mudarCarrinho], calcularTotal);
  yield takeLatest(finalizarPagamento, finalizarPagamentoSaga);
}
