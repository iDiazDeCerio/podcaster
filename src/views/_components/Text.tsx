import styled, { css } from "styled-components";
import { color, fontSize, size } from "../theme";
import { lineHeight } from "../theme/font";

interface Props {
  color?: keyof typeof color;
  fontSize?: keyof typeof fontSize;
  bold?: boolean;
  italic?: boolean;
  marginBottom?: keyof typeof size;
}

export const Text = styled.p<Props>`
  ${(p) => css`
    ${p.color && `color: ${color[p.color]};`}
    ${p.fontSize && `font-size: ${fontSize[p.fontSize]};`}
    ${p.fontSize && `line-height: ${lineHeight[p.fontSize]};`}
    ${p.bold && "font-weight: bold;"}
    ${p.italic && "font-style: italic;"}
    ${p.marginBottom && `margin-bottom: ${size[p.marginBottom]};`}
  `}
`;
