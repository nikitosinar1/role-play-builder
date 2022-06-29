import React, { useCallback } from 'react';

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

import useAnchor from 'hooks/useAnchor';
import defaultImage from 'assets/images/defaultImage.png';

type Action = {
  name: string;
  label: string;
  icon?: React.ReactNode;
};

type ActionCb = (name: string) => void;

type CardActionProps = Action & {
  onClick: ActionCb;
};

const CardAction = ({
  name,
  label,
  icon,
  onClick: _onClick = () => {},
}: CardActionProps) => {
  const onClick = useCallback(() => _onClick(name), [name, _onClick]);

  return (
    <MenuItem onClick={onClick}>
      {icon && (
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText>
        <Typography>{label}</Typography>
      </ListItemText>
    </MenuItem>
  );
};

CardAction.displayName = 'CardAction';

type CardProps = {
  title: string;
  subtitle?: string;
  image?: string;
  actions?: Action[];
  onActionClick?: ActionCb;
  onCardClick?: () => void;
};

const Card = ({
  image = defaultImage,
  title,
  subtitle,
  actions = [],
  onActionClick: _onActionClick = () => {},
  onCardClick,
}: CardProps) => {
  const {
    isOpen, onClick, onClose, anchorEl,
  } = useAnchor();

  const onActionClick = useCallback((name: string) => {
    _onActionClick(name);
    onClose();
  }, [_onActionClick]);

  return (
    <Paper variant="outlined">
      <Box display="flex" alignItems="center">
        <ButtonBase sx={{ display: 'block', width: '100%' }} onClick={onCardClick}>
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

        {Boolean(actions.length) && (
        <>
          <IconButton onClick={onClick}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            open={isOpen}
            onClose={onClose}
            anchorEl={anchorEl}
          >
            {actions.map((item) => (
              <CardAction
                key={item.name}
                name={item.name}
                label={item.label}
                icon={item.icon}
                onClick={onActionClick}
              />
            ))}
          </Menu>
        </>
        )}
      </Box>
    </Paper>
  );
};

Card.displayName = 'Card';

export default Card;
