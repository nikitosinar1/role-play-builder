import React, { useCallback, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import { LayoutConfig } from 'context/layoutContext';
import { useCompendiumForm } from 'context/compendiumFormContext';
import Tracker, { safeTrackerCreation } from 'core/Tracker';
import ImageLoader from 'components/Form/ImageLoader';
import defaultImage from 'assets/images/defaultImage.png';

const TrackerForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: { trackers }, dispatch } = useCompendiumForm();

  const oldTracker = useMemo(() => trackers.find(({ name }) => name === params.name), []);

  const [tracker, setTracker] = useState<Partial<Tracker>>(oldTracker || {});
  const [error, setError] = useState<string | null>(null);

  const isUpdate = Boolean(oldTracker);

  const onBackClick = useCallback(() => {
    const sure = window.confirm('Are you sure you want to go back? All unsaved changes will be lost.');
    if (sure) navigate(trackers.length > 0 ? '/compendium/create/trackers' : '/compendium/create');
  }, [trackers.length]);

  const onCreateTracker = useCallback(() => {
    try {
      const newTracker = safeTrackerCreation(tracker);

      const hasDuplicate = trackers.some(({ name }) => name === newTracker.name);
      if (hasDuplicate && !(oldTracker && oldTracker.name === newTracker.name)) throw new Error('DUPLICATE');

      if (oldTracker) dispatch({ type: 'tracker-update', oldTrackerName: oldTracker.name, tracker: newTracker });
      else dispatch({ type: 'tracker-create', tracker: newTracker });
      navigate('/compendium/create/trackers');
    } catch (e) {
      if (e instanceof Error) {
        switch (e.message) {
          case 'EMPTY_NAME': setError('Missing "Name"'); break;
          case 'EMPTY_TYPE': setError('Missing "Type"'); break;
          case 'INCORRECT_NAME': setError('"Name" should contain only latin chars and underscores'); break;
          case 'DUPLICATE': setError(`Tracker with Name "${tracker.name}" already exists`); break;
          default: setError('Unexpected error');
        }
      } else setError('Unexpected error');
    }
  }, [tracker, oldTracker, trackers]);

  const onDeleteTracker = useCallback(() => {
    const sure = window.confirm('Are you sure you want to delete tracker?');
    if (sure && oldTracker) {
      dispatch({ type: 'tracker-delete', name: oldTracker.name });
      navigate(trackers.length > 1 ? '/compendium/create/trackers' : '/compendium/create');
    }
  }, [oldTracker, trackers.length]);

  const onFieldChange = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);
    setTracker((prev) => {
      if (name !== 'type') return { ...prev, [name]: value };

      const type = value as typeof Tracker.TYPES[number];
      return { name: prev.name, type };
    });
  }, []);

  const onChangeImage = useCallback(
    (image: string) => onFieldChange({ target: { name: 'value', value: image } } as React.FocusEvent<HTMLInputElement>),
    [onFieldChange],
  );

  return (
    <LayoutConfig
      title={isUpdate ? 'Update Tracker' : 'Create Tracker'}
      onBackClick={onBackClick}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            size="small"
            label="Name *"
            fullWidth
            defaultValue={tracker.name}
            onBlur={onFieldChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="type"
            size="small"
            label="Type *"
            fullWidth
            select
            value={tracker.type || ''}
            onChange={onFieldChange}
          >
            {Tracker.TYPES.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          {tracker.type === 'string' && (
          <TextField
            name="value"
            size="small"
            label="Value"
            fullWidth
            onBlur={onFieldChange}
            defaultValue={tracker.value}
          />
          )}
          {tracker.type === 'image' && (
          <ImageLoader onChange={onChangeImage} name="value">
            <Box height={96}>
              <img src={tracker.value || defaultImage} alt="Compendium Thumbnail" />
            </Box>
          </ImageLoader>
          )}
        </Grid>

        <Grid item xs={12}>
          {isUpdate ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={onCreateTracker}
                >
                  Update
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={onDeleteTracker}
                  color="secondary"
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              onClick={onCreateTracker}
            >
              Create
            </Button>
          )}
        </Grid>

        <Grid item xs={12}>
          {error && <Alert severity="error">{error}</Alert>}
        </Grid>
      </Grid>
    </LayoutConfig>
  );
};

TrackerForm.displayName = 'TrackerForm';

export default TrackerForm;
