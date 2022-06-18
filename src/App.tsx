import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import CompendiumList from 'views/CompendiumList/CompendiumList';
import { compose } from 'utils';
import { withCompendiumContext } from 'context/compendiumContext';
import { withThemeContext } from 'context/themeContext';
import { withRouterContext } from 'context/routerContext';
import settings from 'styles/settings.scss';

import Header from './components/Header';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames="view"
          timeout={+settings.viewAnimationSpeed}
        >
          <Box
            sx={{ overflowScrolling: 'touch' }}
            component="main"
            position="fixed"
            width="100vw"
            height={`calc(100vh - ${settings.headerHeight} - ${settings.footerHeight})`}
            top={settings.headerHeight}
            bottom={settings.footerHeight}
            pt="15px"
            pb="15px"
            overflow="auto"
          >
            <Container maxWidth="md">
              <Routes location={location}>
                <Route path="/" element={<CompendiumList />} />
                <Route path="/:compendiumId" element={<div>Test</div>} />
              </Routes>
            </Container>
          </Box>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

App.displayName = 'App';

export default compose(
  withThemeContext,
  withCompendiumContext,
  withRouterContext,
)(App);
