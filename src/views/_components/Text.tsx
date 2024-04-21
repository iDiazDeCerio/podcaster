import styled, { css } from "styled-components";
import { color, fontSize, size } from "../theme";
import { lineHeight } from "../theme/font";

interface Props {
  color?: keyof typeof color;
  fontSize?: keyof typeof fontSize;
  bold?: boolean;
  italic?: boolean;
  align?: "left" | "center" | "right";
  marginbottom?: keyof typeof size;
}

export const Text = styled.p.withConfig({
  shouldForwardProp: (prop) => ["children", "variant"].includes(prop),
})<Props>`
  ${(p) => css`
    ${p.color && `color: ${color[p.color]};`}
    ${p.fontSize && `font-size: ${fontSize[p.fontSize]};`}
    ${p.fontSize && `line-height: ${lineHeight[p.fontSize]};`}
    ${p.align && `text-align: ${p.align};`}
    ${p.bold && "font-weight: bold;"}
    ${p.italic && "font-style: italic;"}
    ${p.marginbottom && `margin-bottom: ${size[p.marginbottom]};`}
  `}
`;
