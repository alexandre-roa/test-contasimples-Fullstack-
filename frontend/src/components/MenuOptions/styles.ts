import styled, { css } from 'styled-components';

export const Menu = styled.div`
  padding-top: 8px;
  display: flex;
  flex-direction: column;

  a {
    justify-content: center;
    & + a {
      margin-top: 8px;
    }

    border-radius: 20px;
    padding: 8px 8px;
    text-decoration: none;
    color: #000;
    transition: color 0.2s;

    &:hover {
      background: #fff;

      svg {
        color: #45b54a;
      }
    }

    svg {
      margin: 0 8px;
    }
  }
`;
