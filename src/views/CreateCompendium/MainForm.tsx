import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { LayoutConfig } from 'context/layoutContext';
import { useCompendiumForm } from 'context/compendiumFormContext';
import { safeCompendiumCreation } from 'core/Compendium';
import { useCompendium } from 'context/compendiumContext';
import List from 'components/List';

const routes = [
  {
    name: 'meta',
    label: 'Meta',
    iconRight: <ChevronRightIcon />,
  },
  {
    name: 'trackers',
    label: 'Trackers',
    iconRight: <ChevronRightIcon />,
  },
  // {
  //   name: 'meta',
  //   label: 'Articles',
  //   iconRight: <ChevronRightIcon />,
  // },
  {
    name: 'interface',
    label: 'Interface',
    children: [
      {
        name: 'interface/preview',
        label: 'Preview',
        iconRight: <ChevronRightIcon />,
      },
      {
        name: 'meta',
        label: 'Flows',
        iconRight: <ChevronRightIcon />,
      },
      // {
      //   name: 'meta',
      //   label: 'Pages',
      //   iconRight: <ChevronRightIcon />,
      // },
    ],
  },
];

const MainForm = () => {
  const navigate = useNavigate();
  const { data } = useCompendiumForm();
  const { dispatch } = useCompendium();

  const [error, setError] = useState<string | null>(null);

  const onCreateCompendium = useCallback(() => {
    try {
      const compendium = safeCompendiumCreation(data.meta, data.trackers, data.characterPreview);
      dispatch({ type: 'create', compendium });
      navigate('/');
    } catch (e) {
      if (e instanceof Error) {
        switch (e.message) {
          case 'EMPTY_NAME': setError('Missing "Compendium Name". Please check Meta'); break;
          case 'EMPTY_VERSION': setError('Missing "Version". Please check Meta'); break;
          case 'EMPTY_PREVIEW_TITLE': setError('Missing "Title" in Interface -> Preview'); break;
          default: setError('Unexpected error');
        }
      } else setError('Unexpected error');
    }
  }, [data]);

  const onBackClick = useCallback(() => {
    const sure = window.confirm('Are you sure you want to cancel compendium creation? All changes will be lost.');
    if (sure) navigate('/');
  }, []);

  const onListItemClick = useCallback((item: { name: string }) => {
    if (item.name !== 'interface') navigate(`/compendium/create/${item.name}`);
  }, []);

  return (
    <LayoutConfig
      title="New Compendium"
      onBackClick={onBackClick}
    >
      <Stack spacing={2}>
        <List items={routes} onListItemClick={onListItemClick} />

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
