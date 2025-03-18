"use client";

import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
    >
      {text}
    </button>
  );
};

export default Button;
