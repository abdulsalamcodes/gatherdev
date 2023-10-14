import React from "react";
import styles from "./CButton.module.scss";
import Loading from "./Loading";
type ButtonProps = {
  onClick?: () => void;
  label: string;
  isLoading?: boolean;
};
const CButton: React.FC<ButtonProps> = ({
  onClick,
  label,
  isLoading,
  ...rest
}) => {
  return (
    <button className={styles.button} onClick={onClick} type="submit" {...rest}>
      {isLoading ? <Loading /> : label}
    </button>
  );
};

export default CButton;
