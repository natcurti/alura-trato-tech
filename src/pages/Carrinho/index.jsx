import Header from "src/components/Header";
import styles from "./Carrinho.module.scss";
import Item from "src/components/Item";
import { useSelector, useDispatch } from "react-redux";
import { resetarCarrinho } from "src/store/reducers/carrinho";

const Carrinho = () => {
  const dispatch = useDispatch();

  const { carrinho, total } = useSelector((state) => {
    let total = 0;
    const carrinhoReduce = state.carrinho.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find((item) => item.id === itemNoCarrinho.id);
      total += item.preco * itemNoCarrinho.quantidade;
      itens.push({
        ...item,
        quantidade: itemNoCarrinho.quantidade,
      });
      return itens;
    }, []);
    return {
      carrinho: carrinhoReduce,
      total: total,
    };
  });

  return (
    <div>
      <Header
        titulo="Carrinho de compras"
        descricao="Confira produtos que você adicionou ao carrinho."
      />
      <div className={styles.carrinho}>
        {carrinho.map((item) => (
          <Item key={item.id} {...item} carrinho />
        ))}
        <div className={styles.total}>
          <strong>Resumo da compra</strong>
          <span>
            Subtotal: <strong> R$ {total.toFixed(2)} </strong>
          </span>
        </div>
        <button
          className={styles.finalizar}
          onClick={() => dispatch(resetarCarrinho())}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default Carrinho;
