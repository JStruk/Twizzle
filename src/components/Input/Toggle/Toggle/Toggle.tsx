import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import uuid from 'react-uuid';
import {
  StyledToggle,
  StyledToggleInput,
  StyledToggleInputLabel,
} from "./StyledToggle";
interface ToggleProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The label of the toggle
   */
  label?: string;
  /**
   * Disable the toggle
   */
  disabled?: boolean;
  /**
   * Toggle the element
   */
  toggled?: boolean;
  /**
   * custom color for the toggle
   */
  color?: string;
  /**
   * onToggle callback function
   */
  onToggle?: () => void;
  /**
   * The size of the avatar out of the following options:
   * small, medium, large
   * @default medium
   */
  size?: "small" | "medium" | "large";
}
const Toggle: React.FC<ToggleProps> = ({
  label,
  disabled,
  size = "medium",
  style,
  toggled = false,
  onChange,
  onToggle,
  color,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const [toggledState, setToggledState] = useState<boolean>(toggled);

  useEffect(() => {
    setToggledState(toggled);
  } , [toggled]);

  const sizeAttributes = {
    small: {
      width: "30px",
      height: "15px",
      toggleSize: "10px",
    },
    medium: {
      width: "40px",
      height: "20px",
      toggleSize: "15px",
    },
    large: {
      width: "50px",
      height: "25px",
      toggleSize: "20px",
    },
  };

  const id = `toggle-${uuid()}`;
  return (
    <StyledToggle role="switch" aria-label="Toggle">
      <StyledToggleInput
        value={toggledState.toString()}
        checked={toggledState}
        disabled={disabled}
        type="checkbox"
        id={id}
        onChange={(e) => {
          setToggledState(e.target.checked);
          if (onToggle) {
            onToggle();
          }
        }}
        {...props}
      />
      <StyledToggleInputLabel
        htmlFor={id}
        style={{
          backgroundColor: toggledState
            ? color || theme.primary?.backgroundColor
            : "#D3D3D3",
          height: sizeAttributes[size]?.height,
          width: sizeAttributes[size]?.width,
          ...style,
        }}
        toggleSize={sizeAttributes[size]?.toggleSize}
      />
    </StyledToggle>
  );
};

export default Toggle;
