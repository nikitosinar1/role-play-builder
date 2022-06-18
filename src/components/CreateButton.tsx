import React from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const sx = {
  right: 'calc(50% - 28px)',
  position: 'fixed',
  bottom: 50,
};

type Props = {
  onClick?: () => void;
};

const CreateButton = ({ onClick }: Props) => (
  <Fab
    color="primary"
    sx={sx}
    onClick={onClick}
  >
    <AddIcon />
  </Fab>
);

CreateButton.displayName = 'CreateButtom';

export default CreateButton;
