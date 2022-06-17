import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';

import defaultImage from './defaultImage.png';

type Props = {
  image?: string;
  title: string;
  subtitle: string;
};

const Card = ({ image = defaultImage, title, subtitle }: Props) => (
  <ButtonBase sx={{ display: 'block' }}>
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Box display="flex" textAlign="left">
        <Box
          mr={2}
          lineHeight={0}
          maxWidth={100}
        >
          <img src={image} alt={title} />
        </Box>
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption">{subtitle}</Typography>
        </Box>
      </Box>
    </Paper>
  </ButtonBase>
);

Card.displayName = 'Card';

export default Card;
