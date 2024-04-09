/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import styles from "./Item.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { mudarFavorito } from "src/store/reducers/itens";
import { useDispatch, useSelector } from "react-redux";
import { mudarCarrinho } from "src/store/reducers/carrinho";
import classNames from "classnames";

const iconeProps = {
  size: 24,
  color: "#041833",
};

const Item = ({ titulo, foto, preco, descricao, favorito, id, carrinho }) => {
  const dispatch = useDispatch();
  const estaNoCarrinho = useSelector((state) =>
    state.carrinho.some((itemNoCarrinho) => itemNoCarrinho.id === id)
  );

  const favoritar = () => {
    dispatch(mudarFavorito(id));
  };

  const resolverCarrinho = () => {
    dispatch(mudarCarrinho(id));
  };

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemNoCarrinho]: carrinho,
      })}
    >
      <div className={styles["item-imagem"]}>
        <img src={foto} alt={titulo} />
      </div>
      <div className={styles["item-descricao"]}>
        <div className={styles["item-titulo"]}>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
        <div className={styles["item-info"]}>
          <div className={styles["item-preco"]}>R$ {preco.toFixed(2)}</div>
          <div className={styles["item-acoes"]}>
            {favorito ? (
              <AiFillHeart
                {...iconeProps}
                color="#ff0000"
                className={styles["item-acao"]}
                onClick={favoritar}
              />
            ) : (
              <AiOutlineHeart
                {...iconeProps}
                className={styles["item-acao"]}
                onClick={favoritar}
              />
            )}
            <FaCartPlus
              {...iconeProps}
              color={estaNoCarrinho ? "#1875E8" : iconeProps.color}
              className={styles["item-acao"]}
              onClick={resolverCarrinho}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
