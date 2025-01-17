import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { Loader } from "../../../Feedback/Loader";
import { StyledButton } from "./StyledButton";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
  /**
   * Color of the button, otherwise it will default to the theme color
   */
  color?: string;
  /**
   * Text inside the button
   */
  label: string;
  /**
   * if true, the button will be outlined
   */
  outlined?: boolean;
  /**
   * onClick handler for the button
   */
  onClick?: () => void;
  /**
   * if true, the button will be disabled
   */
  disabled?: boolean;
  /**
   * loading state of the button
   */
  isLoading?: boolean;
  /**
   * icon displayed on the right of the button
   */
  icon?: React.ReactNode;
  /**
   * Corner style of the button
   */
  corner?: "default" | "round";
  /**
   * Variant of the button chosen from the theme
   */
  variant?: "success" | "info" | "warning" | "danger";
  /**
   * Size of the button
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({
  color,
  label,
  outlined,
  style,
  disabled,
  isLoading,
  onClick,
  icon,
  corner,
  variant,
  size = "medium",
  ...props
}: ButtonProps) => {
  const theme = useContext(ThemeContext);
  const [hover, setHover] = useState(false);

  disabled = isLoading || disabled;

  color =
    theme?.variants?.[variant!]?.color ||
    color ||
    theme?.primary?.backgroundColor;
  return (
    <StyledButton
      onClick={() => onClick && onClick()}
      type="button"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        border: outlined ? "1px solid" : "none",
        borderRadius: corner === "round" ? "30px" : "5px",
        filter: hover
          ? outlined
            ? "brightness(0.95)"
            : "brightness(1.2)"
          : "brightness(1)",
        fontSize:
          size === "small" ? "12px" : size === "large" ? "20px" : "15px",
        ...style,
      }}
      backgroundColor={outlined ? (hover ? "#F2F2F2" : "white") : color}
      color={disabled ? "white" : outlined ? color : "white"}
      disabled={disabled}
      {...props}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading && (
          <Loader
            size={
              size == "small"
                ? "extraSmall"
                : size == "medium"
                ? "small"
                : "medium"
            }
            color={"#FFF"}
            style={{
              marginRight: "5px",
            }}
          />
        )}
        {label}
        {icon &&
          (label ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "5px",
              }}
            >
              {icon}
            </span>
          ) : (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </span>
          ))}
      </span>
    </StyledButton>
  );
};

export default Button;
