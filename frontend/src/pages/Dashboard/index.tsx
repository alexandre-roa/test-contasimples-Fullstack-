import React, { useEffect, useState } from 'react';

import formatValue from '../../utils/formatValue';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import AsideMenu from '../../components/AsideMenu';

import { Container, Content } from './styles';

interface ITransaction {
  id: string;
  title: string;
  value: number;
  type: 'credit' | 'debit';
  user_id: string;
  final_card: number;
  transaction_type: string;
  transaction_description: string;
  establishment: string;
  transaction_date: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      try {
        const response = await api.get(`transactions/${user.id}`);

        const transactionsFormatted = response.data.map(
          (transaction: ITransaction) => ({
            ...transaction,
            formattedValue: formatValue(transaction.value),
            formattedDate: new Date(transaction.created_at).toLocaleDateString(
              'pt-br',
            ),
          }),
        );

        setTransactions(transactionsFormatted);
      } catch (err) {
        console.log(err);
      }
    }

    loadTransactions();
  }, [user.id]);

  console.log(transactions);
  return (
    <Container>
      <AsideMenu />
      <Content>
        <h1>Content</h1>
      </Content>
    </Container>
  );
};

export default Dashboard;
