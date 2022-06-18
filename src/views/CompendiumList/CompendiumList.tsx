import React, { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from 'components/Card/Card';
import CreateButton from 'components/CreateButton';
import { useCompendium } from 'context/compendiumContext';
import Compendium from 'core/Compendium';

const actions = [
  {
    name: 'edit',
    label: 'Edit',
    icon: <EditIcon color="primary" />,
  },
  {
    name: 'copy',
    label: 'Copy',
    icon: <ContentCopyIcon color="primary" />,
  },
  {
    name: 'delete',
    label: 'Delete',
    icon: <DeleteIcon color="primary" />,
  },
];

type CompendiumCardProps = {
  id: Compendium['id'];
  meta: Compendium['meta'];
};

const CompendiumCard = ({ id, meta }: CompendiumCardProps) => {
  const [, dispatch] = useCompendium();

  const onActionClick = useCallback((name: string) => {
    switch (name) {
      case 'edit': break;
      case 'copy': dispatch({ type: 'copy', id }); break;
      case 'delete': dispatch({ type: 'remove', id }); break;
      default: break;
    }
  }, [id]);

  return (
    <Card
      title={meta.name}
      subtitle={`v. ${meta.version}`}
      image={meta.thumbnail}
      actions={actions}
      onActionClick={onActionClick}
    />
  );
};

CompendiumCard.displayName = 'CompendiumCard';

const CompendiumList = () => {
  const [{ data }, dispatch] = useCompendium();

  const onCreateCompendium = useCallback(() => {
    dispatch({ type: 'create' });
  }, []);

  return (
    <>
      <Stack spacing={2}>
        {data.map((item) => (
          <CompendiumCard
            key={item.id}
            id={item.id}
            meta={item.meta}
          />
        ))}
      </Stack>

      <CreateButton onClick={onCreateCompendium} />
    </>
  );
};

CompendiumList.displayName = 'CompendiumList';

export default CompendiumList;
