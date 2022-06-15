import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => (
  <AppBar>
    <Toolbar variant="dense">
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" align="center" flexGrow={1}>
        Compendium
      </Typography>
      <Typography variant="h6" component="div">
        LOGO
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.displayName = 'Header';

export default Header;
