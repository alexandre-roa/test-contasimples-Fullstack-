import React from 'react';
import AsideMenu from '../../components/AsideMenu';
import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
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
