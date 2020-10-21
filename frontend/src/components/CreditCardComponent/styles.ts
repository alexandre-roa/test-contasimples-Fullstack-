import styled from 'styled-components';

export const Container = styled.button`
  position: relative;
  display: flex;
  margin-right: 24px;
  margin-top: 8px;
  flex-direction: column;
  justify-content: flex-start;
  background: #383838;
  min-height: 200px;
  border-radius: 10px;
  min-width: 360px;
  border: 0;
  color: #fff;
  font-weight: 500;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);

    box-shadow: 0px 8px 8px 0px #383838;
    h3 {
      color: #0dc949;
    }
  }

  img {
    width: 100px;
    height: 30px;
    align-self: flex-start;
    margin: 16px 16px;
  }

  h1 {
    font-size: 24px;
    text-align: center;
    padding: 0 16px;
  }

  h3 {
    text-align: center;
    padding: 0 16px;
  }

  div {
    display: flex;
    flex-direction: flex-start;
    align-items: flex-start;
    padding: 8px;

    p {
      margin: 0 8px;
    }
  }
`;
