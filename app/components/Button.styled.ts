// 3rd-party
import styled, { css } from "styled-components";
// app
import { Colors } from "../utils/style";

type ButtonProps = {
  disabled?: boolean;
};

// TODO(refactor): create/use NamedColors instead

const disabledButtonCss = css`
  &,
  &:hover,
  &:active,
  &:focus {
    padding: 16px 24px !important;
    outline: none !important;
    background-color: ${Colors.PRIMARY_01};
    border-color: transparent !important;
    cursor: not-allowed !important;
    transform: none !important;
  }
`;

const baseButtonCss = css<ButtonProps>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  min-height: 62px;
  min-width: 120px;

  padding: 16px 24px;

  background-color: ${Colors.PRIMARY_01};
  border: 1px solid ${Colors.WHITE_01};
  border-radius: 8px;
  color: ${Colors.WHITE_01};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;

  user-select: none;
  text-align: center;
  transition: background-color 140ms ease-in-out 0s,
    border-color 140ms ease-in-out 0s, padding-top 140ms ease-in-out 0s,
    transform 140ms ease-in-out 0s;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:hover:not(:disabled) {
    background-color: ${Colors.SECONDARY_01};
    border-color: ${Colors.WHITE_01};
    transform: translateY(-2px) scale(1.015);
  }

  &:disabled {
    background-color: ${Colors.GRAY_LIGHT_01};
    border-color: transparent !important;
    transform: none !important;
  }

  &:active:not(:disabled) {
    outline: ${Colors.SECONDARY_01} none medium;
    background-color: ${Colors.SECONDARY_01};
    border-color: ${Colors.WHITE_01};
    transform: translateY(0px);
    padding: 18px 24px 16px 24px;
  }

  &:focus:not(:disabled) {
    transform: translateY(0px) scale(1);
    padding: 18px 24px 16px 24px;
  }

  ${({ disabled }) => disabled && disabledButtonCss};
`;

export const Button = styled.button<ButtonProps>`
  ${baseButtonCss};
`;

export const ButtonAnchor = styled.a<ButtonProps>`
  ${baseButtonCss};
  text-decoration: none;
  &:visited {
    color: ${Colors.WHITE_01};
  }
`;
