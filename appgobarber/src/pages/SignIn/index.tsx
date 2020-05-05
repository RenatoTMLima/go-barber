import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

import logo from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logo} />
      <Title>Faça seu logon</Title>
      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />
      <Button onPress={() => {}}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
