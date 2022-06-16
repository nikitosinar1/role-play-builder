import React from 'react';

import Container from '@mui/material/Container';

import Header from '../Header/Header';

import styles from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className={styles.layout}>
    <Header />
    <Container
      maxWidth="md"
      component="main"
      className="main"
    >
      {children}
    </Container>
  </div>
);

Layout.displayName = 'Layout';

export default Layout;
