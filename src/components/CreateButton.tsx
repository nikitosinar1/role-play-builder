import React from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const sx = {
  right: 'calc(50% - 28px)',
  position: 'fixed',
  bottom: 50,
};

const CreateButton = () => (
  <Fab color="primary" sx={sx}>
    <AddIcon />
  </Fab>
);

CreateButton.displayName = 'CreateButtom';

export default CreateButton;
