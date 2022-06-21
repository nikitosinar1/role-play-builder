import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { compose } from 'utils';
import CompendiumList from 'views/CompendiumList/CompendiumList';
import Characters from 'views/Characters/Characters';
import { withCompendiumContext } from 'context/compendiumContext';
import { withThemeContext } from 'context/themeContext';
import { withRouterContext } from 'context/routerContext';
import { withLayoutContext } from 'context/layoutContext';

const App = () => (
  <Routes>
    <Route path="/" element={<CompendiumList />} />
    <Route path="/:compendiumId" element={<Characters />} />
  </Routes>
);

App.displayName = 'App';

export default compose(
  withThemeContext,
  withCompendiumContext,
  withRouterContext,
  withLayoutContext,
)(App);
