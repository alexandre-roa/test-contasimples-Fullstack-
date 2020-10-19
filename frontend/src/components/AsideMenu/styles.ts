import styled from 'styled-components';

export const Container = styled.div`
  background: #f5f5f5;
  width: 20vw;
  padding: 32px;
  height: 100vh;
`;

export const Header = styled.header`
  color: #0dc949;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 16px;

  img {
    width: 170px;
  }

  span {
    margin-left: auto;
  }
`;

export const Balance = styled.div`
  margin: 40px 0;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    h1 {
      strong {
        color: #000;
      }
    }

    button {
      background: #e8e8e8;
      border-radius: 50%;
      border: 0;
      height: 40px;
      width: 40px;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      svg {
        height: 25px;
        width: 25px;
      }
    }
  }
`;

export const Menu = styled.div`
  border-top: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 8px 0;
`;
