import React from 'react';

import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';

import settings from 'styles/settings.scss';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: settings.primary,
    },
    secondary: {
      main: settings.secondary,
    },
    background: {
      default: settings.backgroundDefault,
      paper: settings.backgroundPaper,
    },
    text: {
      primary: settings.textPrimary,
    },
  },
};

const theme = createTheme(themeOptions);

type Props = {
  children: React.ReactNode;
};

const Theme = ({ children }: Props) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

Theme.displayName = 'Theme';

export default Theme;
