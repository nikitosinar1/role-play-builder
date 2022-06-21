import React, { useCallback, useMemo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import { LayoutConfig } from 'context/layoutContext';
import { useCompendium } from 'context/compendiumContext';
import { characters } from '../../dummyData';
import Card from 'components/Card/Card';

const Characters = () => {
  const navigate = useNavigate();
  const { compendiumId = '' } = useParams();
  const [{ data }] = useCompendium();

  const currentCharacters = characters[compendiumId] || [];

  const compendium = useMemo(
    () => data.find((i) => i.id === compendiumId),
    [compendiumId, data],
  );

  const onBackClick = useCallback(() => navigate('/'), []);

  if (!compendium) return null;

  return (
    <>
      <LayoutConfig
        title={compendium.meta.name}
        onBackClick={onBackClick}
        footer="characters"
        onAddClick={console.log}
      />

      <Stack spacing={2}>
        {currentCharacters.map((item) => (
          <Card
            key={item.id}
            title={item.meta.name}
            subtitle={item.meta.description}
            image={item.meta.thumbnail}
          />
        ))}
      </Stack>
    </>
  );
};

Characters.displayName = 'Characters';

export default Characters;
