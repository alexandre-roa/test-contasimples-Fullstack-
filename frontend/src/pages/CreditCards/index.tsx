import React, { useEffect, useState, useMemo, useCallback } from 'react';
import formatValue from '../../utils/formatValue';

import CreditCard from '../../components/CreditCardComponent';
import AsideMenu from '../../components/AsideMenu';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { ITransaction } from '../Dashboard';

import {
  Container,
  CreditCardContainer,
  Content,
  TableContainer,
} from './styles';

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

const CreditCards: React.FC = () => {
  const { user } = useAuth();

  const [cards, setCards] = useState<ICard[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

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
    async function loadCards() {
      try {
        const response = await api.get(`/cards/${user.id}`);

        setCards(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadCards();
  }, []);

  const handleCardChange = useCallback(async (finalCard: number) => {
    const response = await api.get(
      `transactions/${user.id}/bycard/${finalCard}`,
    );

    setTransactions(response.data);
  }, []);

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
  return (
    <Container>
      <AsideMenu />
      <Content>
        <CreditCardContainer>
          {cards &&
            cards.map(card => (
              <CreditCard
                onClick={() => handleCardChange(card.final_card_number)}
                key={card.id}
                label_name={card.label_name}
                final_card_number={card.final_card_number}
                cvv={card.cvv}
                due_date={card.due_date}
              />
            ))}
        </CreditCardContainer>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Cartão</th>
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

export default CreditCards;
