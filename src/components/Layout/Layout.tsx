import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import settings from 'styles/settings.scss';
import Header from 'components/Layout/Header';
import AddButton from 'components/Layout/AddButton';
import { useLayoutContext } from 'context/layoutContext';
import Footer from 'components/Layout/Footer';
import { homeBarHeight } from 'utils';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { onAddClick, footer } = useLayoutContext();

  const footerHeight = footer ? `${(parseInt(settings.footerHeight, 10) + homeBarHeight)}px` : '0px';

  return (
    <>
      <Header />
      <Box
        sx={{ overflowScrolling: 'touch', background: settings.backgroundDefault }}
        component="main"
        position="fixed"
        width="100vw"
        height={`calc(100vh - ${settings.headerHeight} - ${footerHeight})`}
        top={settings.headerHeight}
        bottom={settings.footerHeight}
        pt="15px"
        pb="15px"
        overflow="auto"
      >
        <Container maxWidth="md">
          {children}
        </Container>

        {onAddClick && <AddButton onClick={onAddClick} />}
      </Box>
      {footer && <Footer value={footer} />}
    </>
  );
};

Layout.displayName = 'Layout';

export default Layout;
