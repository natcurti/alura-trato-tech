import { mudarBusca, resetarBusca } from "src/store/reducers/busca";
import styles from "./Busca.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Busca() {
  const busca = useSelector((state) => state.busca);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetarBusca());
  }, [location.pathname, dispatch]);

  return (
    <div className={styles.busca}>
      <input
        className={styles.input}
        placeholder="O que você procura?"
        value={busca}
        onChange={(e) => dispatch(mudarBusca(e.target.value))}
      />
    </div>
  );
}
