import Footer from "../Footer";
import NavBar from "../NavBar";
import styles from "./PaginaPadrao.module.scss";
import { Outlet } from "react-router-dom";

const PaginaPadrao = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles["container-outlet"]}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PaginaPadrao;
