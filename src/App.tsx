import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Theme from './components/Theme';
import Layout from './components/Layout/Layout';

import './styles/index.scss';

const App = () => (
  <>
    <CssBaseline />
    <Theme>
      <Layout>
        <Card>
          <CardContent>
            <Typography variant="body2">
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
      </Layout>
    </Theme>
  </>
);

App.displayName = 'App';

export default App;
