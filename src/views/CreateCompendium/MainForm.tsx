import React, { useCallback, useState } from 'react';

import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { LayoutConfig } from 'context/layoutContext';
import { useCompendiumForm } from 'context/compendiumFormContext';
import { safeCompendiumCreation } from 'core/Compendium';
import { useCompendium } from 'context/compendiumContext';

const routes = [
  {
    name: 'meta',
    label: 'Meta',
  },
  // {
  //   name: 'trackers',
  //   label: 'Trackers',
  // },
  // {
  //   name: 'articles',
  //   label: 'Articles',
  // },
  // {
  //   name: 'interface',
  //   label: 'Interface',
  // },
];

const MainForm = () => {
  const navigate = useNavigate();
  const { data } = useCompendiumForm();
  const { dispatch } = useCompendium();

  const [error, setError] = useState<string | null>(null);

  const onCreateCompendium = useCallback(() => {
    try {
      const compendium = safeCompendiumCreation(data.meta);
      dispatch({ type: 'create', compendium });
      navigate('/');
    } catch (e) {
      if (e instanceof Error) {
        switch (e.message) {
          case 'EMPTY_NAME': setError('Missing "Compendium Name". Please check Meta'); break;
          case 'EMPTY_VERSION': setError('Missing "Version". Please check Meta'); break;
          default: setError('Unexpected error');
        }
      } else setError('Unexpected error');
    }
  }, [data.meta]);

  const onBackClick = useCallback(() => {
    const sure = window.confirm('Are you sure you want to cancel compendium creation? All changes will be lost.');
    if (sure) navigate('/');
  }, []);

  return (
    <LayoutConfig
      title="New Compendium"
      onBackClick={onBackClick}
    >
      <Stack spacing={2}>
        <List sx={{ ml: -2, mr: -2, mt: -2 }}>
          {routes.map((item) => (
            <React.Fragment key={item.name}>
              <ListItemButton onClick={() => navigate(`/compendium/create/${item.name}`)}>
                <ListItemText>{item.label}</ListItemText>
                <ChevronRightIcon />
              </ListItemButton>

              <Divider />
            </React.Fragment>
          ))}
        </List>

        <Button
          variant="outlined"
          fullWidth
          onClick={onCreateCompendium}
        >
          Create
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </LayoutConfig>
  );
};

MainForm.displayName = 'MainForm';

export default MainForm;
