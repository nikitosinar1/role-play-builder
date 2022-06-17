import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Theme from 'components/Theme';
import Layout from 'components/Layout';
import CompendiumList from 'views/CompendiumList/CompendiumList';
import 'styles/index.scss';

const App = () => (
  <>
    <CssBaseline />
    <Theme>
      <Layout>
        <CompendiumList />
      </Layout>
    </Theme>
  </>
);

App.displayName = 'App';

export default App;
