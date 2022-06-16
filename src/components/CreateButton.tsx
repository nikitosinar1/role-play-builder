import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const CreateButton = () => (
  <Box
    position="fixed"
    left="50%"
    bottom={50}
  >
    <IconButton sx={{ fontSize: 60, left: -30 }}>
      <AddCircleTwoToneIcon fontSize="inherit" />
    </IconButton>
  </Box>
);

CreateButton.displayName = 'CreateButtom';

export default CreateButton;
