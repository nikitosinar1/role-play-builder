import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from 'components/Header';
import settings from 'styles/settings.scss';

const layoutSx = {
  height: `calc(100vh - ${settings.headerHeight} - ${settings.footerHeight})`,
  mt: settings.headerHeight,
  mb: settings.footerHeight,
  pt: '15px',
  pb: '15px',
  overflow: 'auto',
  overflowScrolling: 'touch',
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <Box sx={layoutSx}>
    <Header />
    <Container
      maxWidth="md"
      component="main"
      className="main"
    >
      {children}
    </Container>
  </Box>
);

Layout.displayName = 'Layout';

export default Layout;
