import React, { useState, useCallback } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import defaultImage from './defaultImage.png';

const menuOptions = [
  {
    label: 'Edit',
    icon: <EditIcon color="primary" />,
  },
  {
    label: 'Delete',
    icon: <DeleteIcon color="primary" />,
  },
];

type Props = {
  image?: string;
  title: string;
  subtitle: string;
};

const Card = ({ image = defaultImage, title, subtitle }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const onClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Paper variant="outlined">
      <Box display="flex" alignItems="center">
        <ButtonBase sx={{ display: 'block', width: '100%' }}>
          <Box
            display="flex"
            textAlign="left"
            p={1}
          >
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
        </ButtonBase>

        <IconButton onClick={onClick}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          open={isOpen}
          onClose={onClose}
          anchorEl={anchorEl}
        >
          {menuOptions.map((item) => (
            <MenuItem key={item.label}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText>
                <Typography>{item.label}</Typography>
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Box>

    </Paper>
  );
};

Card.displayName = 'Card';

export default Card;
