import React, { useEffect, useState, useMemo, useCallback } from 'react';

import formatValue from '../../utils/formatValue';
import generateData from '../../utils/generateData';
import { useAuth } from '../../hooks/auth';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import AsideMenu from '../../components/AsideMenu';
import Button from '../../components/Button';

import credit from '../../assets/credit.svg';
import debit from '../../assets/debit.svg';

import {
  Container,
  Content,
  CardContainer,
  Card,
  TableContainer,
} from './styles';

export interface ITransaction {
  id: string;
  title: string;
  value: number;
  type: 'credit' | 'debit';
  user_id: string;
  final_card: number;
  formattedValue?: string;
  formattedDate?: string;
  transaction_type: string;
  transaction_description: string;
  establishment: string;
  transaction_date: string;
  created_at: string;
}

interface IBankData {
  user_id: string;
  user: string;
  company: string;
  cnpj: number;
  balance: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([
    {} as ITransaction,
  ]);
  const [creditTransactions, setCreditTransactions] = useState<string>('');
  const [debitTransactions, setDebitTransactions] = useState<string>('');
  const [lastTransaction, setLastTransaction] = useState<ITransaction>(
    {} as ITransaction,
  );
  const [bankData, setBankData] = useState<IBankData>({} as IBankData);

  const history = useHistory();

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      try {
        const response = await api.get(`transactions/${user.id}`);

        setTransactions(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadTransactions();
  }, []);

  useEffect(() => {
    async function loadBankData(): Promise<void> {
      try {
        const response = await api.get(`/users/balance/${user.id}`);

        setBankData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadBankData();
  }, []);

  useEffect(() => {
    async function loadLastTransaction() {
      const response = await api.get(
        `transactions/${user.id}/last-transaction/me`,
      );

      setLastTransaction(response.data);

      setLastTransaction(state => ({
        ...state,
        formattedValue: formatValue(state.value),
      }));
    }
    loadLastTransaction();
  }, []);

  useMemo(async () => {
    const debit = await api.get(`transactions/${user.id}/debit`);

    if (debit.data.length === 0) {
      return formatValue(0);
    }

    const debitValues = debit.data.map(
      (transaction: ITransaction) => transaction.value,
    );
    const formatedDebitValues = debitValues.reduce(
      (acc: number, cur: number) => acc + cur,
    );

    setDebitTransactions(formatValue(formatedDebitValues));

    const credit = await api.get(`transactions/${user.id}/credit`);

    const creditValues = credit.data.map(
      (transaction: ITransaction) => transaction.value,
    );
    const formatedCreditValues = creditValues.reduce(
      (acc: number, cur: number) => acc + cur,
    );

    setCreditTransactions(formatValue(formatedCreditValues));
  }, [transactions]);

  const FormatedTransactions = useMemo(() => {
    if (transactions.length === 0) {
      return [];
    }
    const formatted = transactions.map(transaction => ({
      ...transaction,
      formattedValue: formatValue(transaction.value),
      formattedDate: new Date(transaction.created_at).toLocaleDateString(
        'pt-br',
      ),
    }));

    return formatted;
  }, [transactions]);

  const handleTransactionChange = useCallback(
    async (transactionType: string) => {
      const response = await api.get(
        `transactions/${user.id}/${transactionType}`,
      );
      setTransactions(response.data);
    },
    [transactions],
  );

  const handleGenerateData = useCallback(() => {
    generateData(user.id, api);
    setLoading(true);
  }, []);

  return (
    <Container>
      <AsideMenu />
      <Content>
        <CardContainer>
          <Card onClick={() => handleTransactionChange('credit')}>
            <header>
              <p>Crédito</p>
            </header>
            <h1 data-testid="balance-income">{creditTransactions}</h1>
            <img src={credit} alt="Income" />
          </Card>
          <Card outcome onClick={() => handleTransactionChange('debit')}>
            <header>
              <p>Débito</p>
            </header>
            <h1 data-testid="balance-outcome">{debitTransactions}</h1>
            <img src={debit} alt="Outcome" />
          </Card>

          <Card last>
            <header>
              <p>Ultima transacao:</p>
              <h2>{lastTransaction.title}</h2>
            </header>
            <h1 data-testid="balance-outcome">
              {lastTransaction.formattedValue}
            </h1>
            <img
              src={lastTransaction.type === 'credit' ? credit : debit}
              alt={lastTransaction.type}
            />
          </Card>
        </CardContainer>

        {transactions.length === 0 && (
          <Button loading={loading} onClick={() => handleGenerateData()}>
            Gerar Dados
          </Button>
        )}

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th className="first">Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Cartão</th>
                <th className="last">Data</th>
              </tr>
            </thead>

            {FormatedTransactions &&
              FormatedTransactions.map((transaction: ITransaction) => (
                <tbody key={transaction.id}>
                  <tr>
                    <td className="title">{transaction.title}</td>

                    {transaction.type === 'credit' ? (
                      <td className="income">{transaction.formattedValue}</td>
                    ) : (
                      <td className="outcome">
                        - {transaction.formattedValue}
                      </td>
                    )}
                    <td>{transaction.transaction_description}</td>
                    <td>{transaction.final_card}</td>
                    <td>{transaction.formattedDate}</td>
                    <td></td>
                  </tr>
                </tbody>
              ))}
          </table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;
