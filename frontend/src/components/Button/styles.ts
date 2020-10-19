import styled from 'styled-components';

export const Container = styled.button`
  background: #45b54a;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.3s;

  &:hover {
    background: #0dc949;
    box-shadow: inset 0 0 10px #ffff;
  }
`;
