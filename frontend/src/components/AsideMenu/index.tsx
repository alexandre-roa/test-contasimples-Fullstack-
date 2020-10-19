/* eslint-disable react/button-has-type */
import React, { useState, useCallback, useEffect } from 'react';
import {
  FiBell,
  FiDollarSign,
  FiHome,
  FiEyeOff,
  FiAlignCenter,
  FiFileText,
  FiCreditCard,
  FiCheckSquare,
  FiBarChart2,
  FiMaximize2,
  FiUsers,
  FiCalendar,
  FiClipboard,
  FiList,
  FiPhone,
  FiTag,
  FiEye,
} from 'react-icons/fi';

import formatValue from '../../utils/formatValue';

import MenuOptions from '../MenuOptions';
import { Container, Header, Balance, Menu } from './styles';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

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
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(false);
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
        <img src={logoImg} alt="Conta Simples" />
        <span>
          <FiBell size={25} />
        </span>
      </Header>
      <Balance>
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
        <MenuOptions name="Depositar" to="/" icon={FiDollarSign} />
        <MenuOptions name="Extrato da conta" to="/" icon={FiFileText} />
        <MenuOptions name="Cartões" to="/" icon={FiCreditCard} />
        <MenuOptions name="Emitir cobrança" to="/" icon={FiCheckSquare} />
        <MenuOptions name="Gestão de cobrança" to="/" icon={FiBarChart2} />
        <MenuOptions name="Transferência" to="/" icon={FiMaximize2} />
        <MenuOptions name="Pagamentos" to="/" icon={FiAlignCenter} />
      </Menu>

      <Menu>
        <MenuOptions name="Usuários" to="/" icon={FiUsers} />
        <MenuOptions name="Agendamentos" to="/" icon={FiCalendar} />
        <MenuOptions name="Comprovantes" to="/" icon={FiClipboard} />
        <MenuOptions name="Tarifas" to="/" icon={FiList} />
        <MenuOptions name="Fale conosco" to="/" icon={FiPhone} />
        <MenuOptions name="Benefícios" to="/" icon={FiTag} />
      </Menu>
    </Container>
  );
};

export default AsideMenu;
