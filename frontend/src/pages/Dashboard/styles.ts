import styled from 'styled-components';
import { shade } from 'polished';

interface CardProps {
  outcome?: boolean;
  total?: boolean;
}

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: flex;
  padding: 32px 42px;
  height: 20vh;
`;

export const Card = styled.button`
  align-items: center;
  display: flex;
  flex-direction: ${({ total }: CardProps): string =>
    total ? 'column' : 'row'}row;
  background: ${({ total }: CardProps): string => (total ? '#0dc949' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
  border: ${({ outcome }: CardProps): string =>
    outcome ? '1px solid #e83f5b' : '1px solid #0dc949'};
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};
  margin-right: 24px;
  transition: 0.2s ease-in-out;

  &:hover {
    box-shadow: ${({ outcome }: CardProps): string =>
      outcome
        ? '0px 8px 24px 0px rgba(232,63,91,0.5)'
        : '0px 8px 24px 0px rgba(13, 201, 73, 0.5)'};

    transform: scale(1.2);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
    padding: 0 24px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
