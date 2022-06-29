import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { compose } from 'utils';
import CompendiumList from 'views/CompendiumList/CompendiumList';
import Characters from 'views/Characters/Characters';
import { withCompendiumContext } from 'context/compendiumContext';
import { withThemeContext } from 'context/themeContext';
import { withRouterContext } from 'context/routerContext';
import { withLayoutContext } from 'context/layoutContext';
import { withCharacterContext } from 'context/characterContext';
import CreateCompendium from 'views/CreateCompendium/CreateCompendium';

const App = () => (
  <Routes>
    <Route path="/" element={<CompendiumList />} />
    <Route path="/compendium/create/*" element={<CreateCompendium />} />
    <Route path="/:compendiumId/characters" element={<Characters />} />
  </Routes>
);

App.displayName = 'App';

export default compose(
  withThemeContext,
  withRouterContext,
  withLayoutContext,
  withCompendiumContext,
  withCharacterContext,
)(App);
