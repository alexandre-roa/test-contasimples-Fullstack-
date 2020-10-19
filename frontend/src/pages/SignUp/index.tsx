import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  FiTag,
  FiBriefcase,
  FiDisc,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.jpg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ISignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          full_name: Yup.string().required('Nome obrigatório'),
          company_name: Yup.string().required('Nome da empresa obrigatório'),
          cnpj: Yup.number().required('CNPJ obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no Conta Simples!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Conta Simples" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>
              Abra sua <br />
              Conta <strong>Simples</strong>
            </h1>

            <Input name="full_name" icon={FiUser} labelName="Nome completo" />
            <Input
              name="company_name"
              icon={FiBriefcase}
              labelName="Nome da empresa"
            />
            <Input name="cnpj" icon={FiDisc} labelName="CNPJ da empresa" />
            <Input
              containerStyle={{ marginTop: 24 }}
              name="email"
              icon={FiMail}
              labelName="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              labelName="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
