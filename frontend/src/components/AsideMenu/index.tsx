/* eslint-disable react/button-has-type */
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiHome, FiEyeOff, FiCreditCard, FiEye } from 'react-icons/fi';

import formatValue from '../../utils/formatValue';

import MenuOptions from '../MenuOptions';
import { Container, Header, Balance, Menu } from './styles';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Button from '../Button';

interface IBalanceProps {
  user_id: string;
  user: string;
  company: string;
  cnpj: number;
  balance: number;
}

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

const AsideMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isAvailable, setIsAvailable] = useState(false);
  const [selected, setSelected] = useState(false);
  const [acountData, setAcountData] = useState<IBalanceProps>(
    {} as IBalanceProps,
  );

  useEffect(() => {
    async function loadBalance(): Promise<void> {
      try {
        const response = await api.get(`/users/balance/${user.id}`);

        setAcountData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadBalance();
  }, [user.id]);

  const toggleAvailable = useCallback(() => {
    setIsAvailable(state => !state);
  }, []);

  return (
    <Container>
      <Header>
        <Link to="/">
          <img src={logoImg} alt="Conta Simples" />
        </Link>
        <span>
          <FiBell size={25} />
        </span>
      </Header>
      <Balance>
        <h3>
          Olá,{' '}
          <strong style={{ color: '#000', fontWeight: 'bold' }}>
            {acountData.user}
          </strong>
        </h3>
        <h3 style={{ color: '#0dc949' }}>
          <strong>{acountData.company}</strong>
        </h3>
        <br />
        <h3>Saldo da conta</h3>
        <div>
          <h1>
            <strong>
              {' '}
              {isAvailable ? formatValue(acountData.balance) : '*******'}
            </strong>
          </h1>
          <button onClick={() => toggleAvailable()}>
            {isAvailable ? <FiEye size={25} /> : <FiEyeOff size={25} />}
          </button>
        </div>
      </Balance>
      <Menu>
        <MenuOptions name="Início" to="/" icon={FiHome} />
        <MenuOptions name="Cartões" to="/credit-card" icon={FiCreditCard} />
        <Button onClick={signOut}> Sair </Button>
      </Menu>
    </Container>
  );
};

export default AsideMenu;
