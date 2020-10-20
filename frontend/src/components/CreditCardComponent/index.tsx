import React, { ButtonHTMLAttributes } from 'react';

import logo from '../../assets/card-logo.png';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  label_name: string;
  final_card_number: number;
  cvv: number;
  due_date: Date;
};

const CreditCard: React.FC<ButtonProps> = ({
  label_name,
  final_card_number,
  cvv,
  due_date,
  ...rest
}) => (
  <Container type="button" {...rest}>
    <img src={logo} alt="Conta Simples" />
    <h1>**** **** **** {final_card_number}</h1>
    <h3>{label_name}</h3>
    <div>
      <p>
        Vencimento <br /> {new Date(due_date).toLocaleDateString('pt-br')}{' '}
      </p>
      <p>
        cvv <br /> {cvv}{' '}
      </p>
    </div>
  </Container>
);

export default CreditCard;
