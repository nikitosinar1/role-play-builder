import React, { forwardRef, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import Slide from '@mui/material/Slide';
import { TransitionGroup } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';

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

const CompendiumCard = forwardRef((
  { id, meta }: CompendiumCardProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const navigate = useNavigate();
  const [, dispatch] = useCompendium();

  const onActionClick = useCallback((name: string) => {
    switch (name) {
      case 'edit': break;
      case 'copy': dispatch({ type: 'copy', id }); break;
      case 'delete': dispatch({ type: 'remove', id }); break;
      default: break;
    }
  }, [id]);

  const onCardClick = useCallback(() => {
    navigate(id);
  }, [id]);

  return (

    <div ref={ref}>
      <Card
        title={meta.name}
        subtitle={`v. ${meta.version}`}
        image={meta.thumbnail}
        actions={actions}
        onActionClick={onActionClick}
        onCardClick={onCardClick}
      />
    </div>
  );
});

CompendiumCard.displayName = 'CompendiumCard';

const CompendiumList = () => {
  const [{ data }, dispatch] = useCompendium();

  const onCreateCompendium = useCallback(() => {
    dispatch({ type: 'create' });
  }, []);

  return (
    <>
      <Stack spacing={2}>
        <TransitionGroup component={null}>
          {data.map((item) => (
            <Slide
              key={item.id}
              direction="right"
              appear={false}
            >
              <CompendiumCard
                key={item.id}
                id={item.id}
                meta={item.meta}
              />
            </Slide>
          ))}
        </TransitionGroup>
      </Stack>

      <CreateButton onClick={onCreateCompendium} />
    </>
  );
};

CompendiumList.displayName = 'CompendiumList';

export default CompendiumList;
