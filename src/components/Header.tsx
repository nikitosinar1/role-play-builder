import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';

import useBooleanState from 'hooks/useBooleanState';
import { isIOS } from 'utils';
import logo from 'assets/images/logo.png';

const Header = () => {
  const [isOpen, onOpen, onClose] = useBooleanState();

  return (
    <AppBar>
      <Toolbar variant="dense">
        <Box width={70}>
          <IconButton
            onClick={onOpen}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Typography
          variant="h6"
          component="div"
          align="center"
          flexGrow={1}
        >
          Compendium
        </Typography>

        <Box width={70} lineHeight={0}>
          <img src={logo} alt="Role Play Builder logo" />
        </Box>
      </Toolbar>

      <SwipeableDrawer
        disableBackdropTransition={!isIOS()}
        disableDiscovery={isIOS()}
        anchor="left"
        open={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        <Box width={250}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </AppBar>
  );
};

Header.displayName = 'Header';

export default Header;
