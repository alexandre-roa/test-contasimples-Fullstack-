import React, { useEffect, useState, useMemo, useCallback } from 'react';

import formatValue from '../../utils/formatValue';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import AsideMenu from '../../components/AsideMenu';

import credit from '../../assets/credit.svg';
import debit from '../../assets/debit.svg';
import total from '../../assets/total.svg';

import {
  Container,
  Content,
  CardContainer,
  Card,
  TableContainer,
} from './styles';

interface ITransaction {
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

interface ICard {
  id: string;
  label_name: string;
  card_limit: number;
  card_number: number;
  final_card_number: number;
  due_date: Date;
  status: string;
  cvv: number;
  user_id: string;
  created_at: string;
  transactions: ITransaction[];
}

interface ITypeTransactions {
  title: string;
  value: number;
  type: string;
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
  const [cards, setCards] = useState<ICard[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [creditTransactions, setCreditTransactions] = useState<string>('');
  const [debitTransactions, setDebitTransactions] = useState<string>('');
  const [bankData, setBankData] = useState<IBankData>({} as IBankData);

  useEffect(() => {
    async function loadCreditTransactions(): Promise<void> {
      try {
        const response = await api.get(`transactions/${user.id}`);

        setTransactions(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadCreditTransactions();
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

  useMemo(async () => {
    const debit = await api.get(`transactions/${user.id}/debit`);

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
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
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
