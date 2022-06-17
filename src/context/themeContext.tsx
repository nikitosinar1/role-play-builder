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

export const withThemeContext = <P extends Record<string, unknown>>(
  Comp: React.FunctionComponent<P>,
) => {
  const WrappedComp = (props: P) => (
    <ThemeProvider theme={theme}>
      <Comp {...props} />
    </ThemeProvider>
  );

  WrappedComp.displayName = `withThemeContext(${Comp.displayName})`;

  return WrappedComp;
};
