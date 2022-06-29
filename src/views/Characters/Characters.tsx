import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import { LayoutConfig } from 'context/layoutContext';
import { useCompendium } from 'context/compendiumContext';
import Card from 'components/Card/Card';
import { useCharacter } from 'context/characterContext';
import Character from 'core/Character';

const actions = [
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

type CharacterCardProps = {
  id: Character['id'];
  meta: Character['meta'];
};

const CharacterCard = ({ id, meta }: CharacterCardProps) => {
  const { dispatch } = useCharacter();

  const onActionClick = useCallback((name: string) => {
    switch (name) {
      case 'copy': dispatch({ type: 'copy', id }); break;
      case 'delete': dispatch({ type: 'remove', id }); break;
      default: break;
    }
  }, [id]);

  return (
    <Card
      title={meta.name}
      subtitle={meta.description}
      image={meta.thumbnail}
      actions={actions}
      onActionClick={onActionClick}
    />
  );
};

CharacterCard.displayName = 'CharacterCard';

const Characters = () => {
  const navigate = useNavigate();
  const { selected } = useCompendium();
  const { compendiumCharacters, dispatch } = useCharacter();

  const onBackClick = useCallback(() => navigate('/'), []);

  const onCreateCharacter = useCallback(
    () => selected && dispatch({ type: 'create', compendiumId: selected.id }),
    [selected],
  );

  if (!selected) return null;

  return (
    <LayoutConfig
      title={selected.meta.name}
      onBackClick={onBackClick}
      footer="characters"
      onAddClick={onCreateCharacter}
    >
      <Stack spacing={2}>
        {compendiumCharacters.map((item) => (
          <CharacterCard
            key={item.id}
            id={item.id}
            meta={item.meta}
          />
        ))}
      </Stack>
    </LayoutConfig>
  );
};

Characters.displayName = 'Characters';

export default Characters;
