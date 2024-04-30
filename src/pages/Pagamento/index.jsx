import Header from "src/components/Header";
import styles from "./Pagamento.module.scss";
import Select from "src/components/Select";
import Button from "src/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  carregarPagamento,
  finalizarPagamento,
} from "src/store/reducers/carrinho";

const Pagamento = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);
  const total = useSelector((state) => state.carrinho.total);
  const [formaDePagamento, setFormaDePagamento] = useState("");
  const valorTotal =
    formaDePagamento === "" ? total : total * formaDePagamento.taxa;

  useEffect(() => {
    dispatch(carregarPagamento());
  }, [dispatch]);

  const mudarFormaDePagamento = (e) => {
    if (e.target.value === "") return setFormaDePagamento("");
    setFormaDePagamento(
      usuario.cartoes.find((cartao) => cartao.id === e.target.value)
    );
  };

  const finalizar = () => {
    dispatch(finalizarPagamento({ valorTotal, formaDePagamento }));
  };

  return (
    <div className={styles.container}>
      <Header titulo="Pagamento" />
      <div className={styles.dados}>
        <p className={styles.forma}>
          Olá, {usuario.nome}! Escolha a forma de pagamento:
        </p>
        <Select
          placeholder="Forma de pagamento"
          value={formaDePagamento.id}
          onChange={mudarFormaDePagamento}
        >
          <option value="">Forma de Pagamento</option>
          {usuario.cartoes?.map((cartao) => (
            <option key={cartao.id} value={cartao.id}>
              {cartao.nome}
            </option>
          ))}
        </Select>
        <div className={styles.content}>
          {formaDePagamento !== "" && (
            <>
              <p>
                A forma de pagamento {formaDePagamento.nome} tem taxa de{" "}
                {formaDePagamento.taxa}
              </p>
              <p>
                O saldo deste cartão é de R$ {formaDePagamento.saldo.toFixed(2)}
              </p>
            </>
          )}
          <p>Total com taxas: R${valorTotal.toFixed(2)}</p>
        </div>
        <div className={styles.finalizar}>
          <Button
            disabled={valorTotal === 0 || formaDePagamento === ""}
            onClick={finalizar}
          >
            Finalizar compra
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagamento;
