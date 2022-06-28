import React from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

import { homeBarHeight } from 'utils';
import settings from 'styles/settings.scss';

type Props = {
  onClick: () => void;
};

const AddButton = ({ onClick }: Props) => (
  <Box
    position="fixed"
    right="calc(50% - 28px)"
    bottom={parseInt(settings.footerHeight, 10) + 10 + homeBarHeight}
  >
    <Fab
      color="primary"
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  </Box>
);

AddButton.displayName = 'AddButton';

export default AddButton;
