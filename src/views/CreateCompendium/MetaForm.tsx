import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { LayoutConfig } from 'context/layoutContext';
import ImageLoader from 'components/Form/ImageLoader';
import defaultImage from 'assets/images/defaultImage.png';
import { useCompendiumForm } from 'context/compendiumFormContext';

const buttonSx = { p: 0 };

const MetaForm = () => {
  const navigate = useNavigate();
  const { data: { meta }, dispatch } = useCompendiumForm();

  const onThumbnailChange = useCallback(
    (thumbnail: string) => dispatch({ type: 'meta', meta: { thumbnail } }),
    [],
  );

  const onBlurField = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as 'name' | 'version' | 'description';

    dispatch({ type: 'meta', meta: { [field]: event.target.value } });
  }, []);

  const onBackClick = useCallback(() => navigate('/compendium/create'), []);

  return (
    <LayoutConfig
      title="Meta"
      onBackClick={onBackClick}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ImageLoader
            onChange={onThumbnailChange}
            name="thumbnail"
            fullWidth
            sx={buttonSx}
          >
            <Box height={96}>
              <img src={meta.thumbnail || defaultImage} alt="Compendium Thumbnail" />
            </Box>
          </ImageLoader>
        </Grid>

        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Compendium Name *"
                size="small"
                fullWidth
                onBlur={onBlurField}
                defaultValue={meta.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="version"
                label="Version *"
                size="small"
                fullWidth
                defaultValue={meta.version}
                onBlur={onBlurField}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            size="small"
            multiline
            rows={4}
            fullWidth
            defaultValue={meta.description}
            onBlur={onBlurField}
          />
        </Grid>
      </Grid>
    </LayoutConfig>
  );
};

MetaForm.displayName = 'MetaForm';

export default MetaForm;
