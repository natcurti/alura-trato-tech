/* eslint-disable react/prop-types */
import styles from "./Header.module.scss";
import TituloComImagem from "./TituloComImagem";
import TituloSemImagem from "./TituloSemImagem";

export default function Header({
  children,
  titulo,
  descricao,
  className = "",
  imagem,
}) {
  return (
    <header className={styles.header}>
      {titulo && !imagem && (
        <TituloSemImagem titulo={titulo} descricao={descricao} />
      )}
      {titulo && imagem && (
        <TituloComImagem
          titulo={titulo}
          descricao={descricao}
          imagem={imagem}
          className={className}
        >
          {children}
        </TituloComImagem>
      )}
    </header>
  );
}
