/* eslint-disable react/prop-types */
import styles from "./Button.module.scss";

const Button = ({ children, type, onClick }) => {
  return (
    <button className={styles.finalizar} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
