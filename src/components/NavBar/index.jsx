import Logo from "src/assets/logo-trato-tech.svg?react";
import styles from "./NavBar.module.scss";
import classNames from "classnames";
import { RiShoppingCart2Line, RiShoppingCartFill } from "react-icons/ri";
import Busca from "../Busca";

const iconProps = {
  color: "white",
  size: 24,
};

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} />
      <div className={styles.link}>
        <div>
          <a
            href="/"
            className={classNames(styles.link, {
              [styles.selected]: window.location.pathname === "/",
            })}
          >
            Página Inicial
          </a>
        </div>
      </div>
      <div className={styles.busca}>
        <Busca />
      </div>
      <div className={styles.icones}>
        <a href="/carrinho">
          {window.location.pathname === "/carrinho" ? (
            <RiShoppingCartFill {...iconProps} />
          ) : (
            <RiShoppingCart2Line {...iconProps} />
          )}
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
