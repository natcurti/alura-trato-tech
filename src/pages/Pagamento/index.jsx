import Header from "src/components/Header";
import styles from "./Pagamento.module.scss";
import Select from "src/components/Select";
import Button from "src/components/Button";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { carregarPagamento } from "src/store/reducers/carrinho";

const Pagamento = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(carregarPagamento());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header titulo="Pagamento" />
      <div className={styles.dados}>
        <p className={styles.forma}>
          Olá, usuário! Escolha a forma de pagamento:
        </p>
        <Select placeholder="Forma de pagamento">
          <option value="">Forma de Pagamento</option>
        </Select>
        <div className={styles.content}>
          <p>Total com taxas: R$00</p>
        </div>
        <div className={styles.finalizar}>
          <Button>Finalizar compra</Button>
        </div>
      </div>
    </div>
  );
};

export default Pagamento;
