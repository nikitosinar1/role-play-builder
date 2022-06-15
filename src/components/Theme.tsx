import React from 'react';

import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';

import styles from '../styles/settings.scss';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: styles.primary,
    },
    secondary: {
      main: styles.secondary,
    },
    background: {
      default: styles.backgroundDefault,
      paper: styles.backgroundPaper,
    },
    text: {
      primary: styles.textPrimary,
    },
  },
};

const theme = createTheme(themeOptions);

type Props = {
    children: React.ReactNode
}

const Theme = ({ children }: Props) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

Theme.displayName = 'Theme';

export default Theme;
