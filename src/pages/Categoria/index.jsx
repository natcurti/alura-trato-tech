import Header from "src/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Categoria.module.scss";
import Item from "src/components/Item";
import Button from "src/components/Button";
import { buscarCategorias } from "src/store/reducers/categorias";
import { buscarItens } from "src/store/reducers/itens";

export default function Categoria() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nomeCategoria } = useParams();

  const { categoria, itens } = useSelector((state) => {
    const regexp = new RegExp(state.busca, "i");

    if (state.categorias.length === 0 && state.itens.length === 0) {
      dispatch(buscarCategorias());
      dispatch(buscarItens());
    }

    return {
      categoria:
        state.categorias.find((categoria) => categoria.id === nomeCategoria) ||
        {},
      itens: state.itens.filter(
        (item) => item.categoria === nomeCategoria && item.titulo.match(regexp)
      ),
    };
  });

  return (
    <div>
      <Header
        titulo={categoria.nome}
        descricao={categoria.descricao}
        imagem={categoria.header}
      >
        <Button onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>
          Quero anunciar
        </Button>
      </Header>
      <div className={styles.itens}>
        {itens?.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
