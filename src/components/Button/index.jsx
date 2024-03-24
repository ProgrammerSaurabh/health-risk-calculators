import React from 'react';

const Button = ({
  label,
  title = null,
  type = 'button',
  disabled = false,
  onClick = () => null,
  classes = null,
  style = 'bg-primary text-white hover:bg-primary/90',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : style
      }  p-4 rounded-lg cursor-pointer  ${classes}`}
      title={title}
    >
      {label}
    </button>
  );
};

export default Button;
