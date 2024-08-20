import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: "primary" | "error";
};

const buttonColors = {
  primary: {
    backgroundColor: "#dcbdf6",
    border: "1px #966eb7 solid",
  },
  error: {
    backgroundColor: "#e4b6b6",
    border: "1px #d64949 solid",
  },
};

const Button = ({ children, color, ...rest }: ButtonProps) => {
  const styles = {
    padding: "24px",
    width: "200px",
    cursor: "pointer",
    ...(color === "primary" && buttonColors.primary),
    ...(color === "error" && buttonColors.error),
  };
  return (
    <button style={styles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
