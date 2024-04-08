/* eslint-disable react/prop-types */
import styles from "./Item.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { mudarFavorito } from "src/store/reducers/itens";

const iconeProps = {
  size: 24,
  color: "#041833",
};

const Item = ({ titulo, foto, preco, descricao, favorito, id }) => {
  const dispatch = useDispatch();
  const resolverFavorito = () => {
    dispatch(mudarFavorito(id));
  };

  return (
    <div className={styles.item}>
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
                onClick={resolverFavorito}
              />
            ) : (
              <AiOutlineHeart
                {...iconeProps}
                className={styles["item-acao"]}
                onClick={resolverFavorito}
              />
            )}
            <FaCartPlus
              {...iconeProps}
              color={false ? "#1875E8" : iconeProps.color}
              className={styles["item-acao"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
