import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  padding: 24px 24px;
  display: flex;
  margin-right: 24px;
  flex-direction: column;
`;

export const CreditCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #0dc949;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      background: #f5f5f5;

      &.first {
        border-radius: 30px 0px 0px 0px;
      }

      &.last {
        border-radius: 0px 30px 0px 0px;
      }
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
