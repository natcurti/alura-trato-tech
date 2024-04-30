/* eslint-disable react/prop-types */
import styles from "./Button.module.scss";

const Button = ({ children, type, onClick, disabled }) => {
  return (
    <button
      className={styles.finalizar}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
