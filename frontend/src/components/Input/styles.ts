import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFielled: boolean;
  isErrored: boolean;
}

interface ILabelProps {
  labelIsFocused: boolean;
  labelIsFielled: boolean;
  labelIsErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  background: transparent;
  border-radius: 10px;
  border: 2px solid #ddd;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
      color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #45b54a;
      border-color: #45b54a;
    `}

  ${props =>
    props.isFielled &&
    css`
      color: #45b54a;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000;

    &::placeholder {
      color: #000;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Label = styled.label<ILabelProps>`
  span {
    color: #666360;
    height: 57px;
    position: absolute;
    top: 0;
    left: 50px;

    display: flex;
    align-items: center;

    transform-origin: 0% 0%;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;

    transition: 0.2s ease-in-out;

    ${props =>
      props.labelIsFocused &&
      css`
        transform: scale(0.6) translateY(-15px);
      `}

    ${props =>
      props.labelIsFielled &&
      css`
        transform: scale(0.6) translateY(-15px);
      `}


  ${props =>
      props.labelIsErrored &&
      css`
        transform: scale(0.6) translateY(-15px);
      `}
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
