import React from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

type Props = {
  onClick: () => void;
};

const AddButton = ({ onClick }: Props) => (
  <Box
    position="fixed"
    right="calc(50% - 28px)"
    bottom={65}
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
