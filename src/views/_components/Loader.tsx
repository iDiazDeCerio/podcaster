import React from "react";
import styled, { css, keyframes } from "styled-components";
import { color, size } from "../theme";

interface Props {
  fullPage?: boolean;
}

export const Loader: React.FC<Props> = ({ fullPage }) => (
  <LoadIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fullPage={fullPage}
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

const LoadIcon = styled.svg<Props>`
  display: block;
  width: ${size.s};
  height: ${size.s};

  color: ${color.blue};

  shape-rendering: auto;
  animation: ${rotationAnimation} 1.5s linear infinite;

  ${(p) =>
    p.fullPage &&
    css`
      width: ${size.l};
      height: ${size.l};
      margin-top: ${size.l};
      margin-left: auto;
      margin-right: auto;
    `}
`;
