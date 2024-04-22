import Header from "src/components/Header";
import styles from "./Home.module.scss";
import relogio from "src/assets/inicial.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/Button";
import { useCallback, useEffect } from "react";
import instance from "src/common/config/api";
import { adicionarCategorias } from "src/store/reducers/categorias";
import { adicionarItens } from "src/store/reducers/itens";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias);

  const buscarCategorias = useCallback(async () => {
    const resposta = await instance.get("/categorias");
    dispatch(adicionarCategorias(resposta.data));
  }, [dispatch]);

  const buscarItens = useCallback(async () => {
    const resposta = await instance.get("/itens");
    dispatch(adicionarItens(resposta.data));
  }, [dispatch]);

  useEffect(() => {
    buscarCategorias();
    buscarItens();
  }, [buscarCategorias, buscarItens]);

  return (
    <div>
      <Header
        titulo="Classificados Tech"
        descricao="Compre diversos tipos de produtos no melhor site do Brasil!"
        imagem={relogio}
        className={styles.header}
      >
        <Button onClick={() => navigate("/anuncie")}>Quero Anunciar</Button>
      </Header>
      <div className={styles.categorias}>
        <div>
          <h1>Categorias</h1>
        </div>
        <div className={styles["categorias-container"]}>
          {categorias.map((categoria, index) => (
            <div
              key={index}
              onClick={() => navigate(`/categoria/${categoria.id}`)}
            >
              <img src={categoria.thumbnail} alt={categoria.nome} />
              <h1>{categoria.nome}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
