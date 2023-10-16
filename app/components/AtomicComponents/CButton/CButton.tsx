import React from "react";
import styles from "./CButton.module.scss";
import Loader from "../Loader/Loader";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  label: string;
  isLoading?: boolean;
}
const CButton: React.FC<ButtonProps> = ({
  onClick,
  label,
  isLoading,
  ...rest
}) => {
  return (
    <button className={styles.button} onClick={onClick} type="submit" {...rest}>
      {isLoading ? <Loader size={30} color="white" /> : label}
    </button>
  );
};

export default CButton;
