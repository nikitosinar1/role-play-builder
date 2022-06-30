import React, { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import { useCompendiumForm } from 'context/compendiumFormContext';
import { LayoutConfig } from 'context/layoutContext';

const TrackersList = () => {
  const navigate = useNavigate();
  const { data: { trackers } } = useCompendiumForm();

  const onBackClick = useCallback(() => navigate('/compendium/create'), []);

  const onAddTracker = useCallback(() => navigate('/compendium/create/trackers/create'), []);

  useEffect(() => {
    if (trackers.length) return;
    navigate('/compendium/create/trackers/create');
  }, []);

  return (
    <LayoutConfig
      title="Trackers"
      onBackClick={onBackClick}
      onAddClick={onAddTracker}
    >
      <Stack spacing={2}>
        <List sx={{ ml: -2, mr: -2, mt: -2 }}>
          {trackers.map((item) => (
            <React.Fragment key={item.name}>
              <ListItemButton onClick={() => navigate(`/compendium/create/trackers/${item.name}`)}>
                <ListItemText>{item.name}</ListItemText>
                <ChevronRightIcon />
              </ListItemButton>

              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Stack>
    </LayoutConfig>
  );
};

TrackersList.displayName = 'TrackersList';

export default TrackersList;
