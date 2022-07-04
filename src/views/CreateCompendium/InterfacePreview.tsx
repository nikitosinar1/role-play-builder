import React, { useCallback, useMemo } from 'react';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import { useCompendiumForm } from 'context/compendiumFormContext';
import { LayoutConfig } from 'context/layoutContext';

const InterfacePreview = () => {
  const navigate = useNavigate();
  const { data: { characterPreview, trackers }, dispatch } = useCompendiumForm();

  const imageTrackers = useMemo(() => {
    const images = trackers.filter((item) => item.type === 'image');
    if (
      !characterPreview.thumbnail || images.some((i) => i.name === characterPreview.thumbnail)
    ) return images;
    return [...images, { name: characterPreview.thumbnail }];
  }, [trackers, characterPreview.thumbnail]);

  const onFieldChange = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const name = e.target.name as keyof typeof characterPreview;
    dispatch({ type: 'character-preview', preview: { [name]: value } });
  }, []);

  const onBackClick = useCallback(() => navigate('/compendium/create'), []);

  return (
    <LayoutConfig title="Preview" onBackClick={onBackClick}>
      <Stack spacing={2}>
        <TextField
          name="thumbnail"
          size="small"
          label="Thumbnail"
          fullWidth
          select
          value={characterPreview.thumbnail || ''}
          onChange={onFieldChange}
        >
          <MenuItem key="" value="">
            No image
          </MenuItem>
          {imageTrackers.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </LayoutConfig>
  );
};

InterfacePreview.displayName = 'InterfacePreview';

export default InterfacePreview;
