import React from 'react';

import Layout from 'components/Layout';
import CompendiumList from 'views/CompendiumList/CompendiumList';
import { compose } from 'utils';
import { withCompendiumContext } from 'context/compendiumContext';
import { withThemeContext } from 'context/themeContext';

const App = () => (
  <Layout>
    <CompendiumList />
  </Layout>
);

App.displayName = 'App';

export default compose(
  withThemeContext,
  withCompendiumContext,
)(App);
