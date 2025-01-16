import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  isDisabled = false,
  className = "",
  icon,
  iconPosition = "left",
  noMargin = false,
  ...rest
}) => {
  const baseClasses = `btn btn-${variant}`;
  const disabledClass = isDisabled ? "disabled" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${disabledClass} ${className}`}
      disabled={isDisabled}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <i className={`fa ${icon} ${noMargin ? "" : "me-2"}`}></i>
      )}
      {label}
      {icon && iconPosition === "right" && (
        <i className={`fa ${icon} ${noMargin ? "" : "ms-2"}`}></i>
      )}
    </button>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "success",
    "outline-primary",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["left", "right"]),
};

export default CustomButton;
