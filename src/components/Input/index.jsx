import { forwardRef } from "react";
import styles from "./Input.module.scss";

const Input = ({ value, onChange, ...props }, ref) => {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      {...props}
      className={styles.input}
    />
  );
};

export default forwardRef(Input);
