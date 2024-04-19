import React from "react";
import styled, { keyframes } from "styled-components";
import { color, size } from "../theme";

export const Loader: React.FC = () => (
  <LoadIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    style={{ shapeRendering: "auto", display: "block" }}
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="currentcolor"
      strokeWidth="12"
      r="44"
      strokeDasharray="200 80"
    ></circle>
  </LoadIcon>
);

const rotationAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadIcon = styled.svg`
  display: block;
  width: ${size.s};
  height: ${size.s};

  color: ${color.blue};

  animation: ${rotationAnimation} 1.5s linear infinite;
`;
