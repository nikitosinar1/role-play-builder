import React, { useCallback } from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SearchIcon from '@mui/icons-material/Search';

import settings from 'styles/settings.scss';

const footerSx = {
  position: 'fixed',
  left: 0,
  bottom: 0,
  right: 0,
  boxShadow: 15,
  height: `calc(${settings.footerHeight} + ${settings.safeBottomArea})`,
  pb: settings.safeBottomArea,
};

type Props = {
  value: string;
};

const Footer = ({ value }: Props) => {
  const onChange = useCallback(console.log, []);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={onChange}
      component="footer"
      sx={footerSx}
    >
      <BottomNavigationAction
        value="characters"
        label="Characters"
        icon={<PersonIcon />}
      />
      <BottomNavigationAction
        value="compendium"
        label="Compendium"
        icon={<MenuBookIcon />}
      />
      <BottomNavigationAction
        value="bookmarks"
        label="Bookmarks"
        icon={<BookmarksIcon />}
      />
      <BottomNavigationAction
        value="search"
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
};

Footer.displayName = 'Footer';

export default Footer;
