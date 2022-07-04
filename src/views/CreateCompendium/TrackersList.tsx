import React, { useCallback, useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useCompendiumForm } from 'context/compendiumFormContext';
import { LayoutConfig } from 'context/layoutContext';
import List from 'components/List';

const TrackersList = () => {
  const navigate = useNavigate();
  const { data: { trackers } } = useCompendiumForm();

  const items = useMemo(() => trackers.map((item) => ({
    name: item.name,
    label: item.name,
    iconRight: <ChevronRightIcon />,
  })), [trackers]);

  const onBackClick = useCallback(() => navigate('/compendium/create'), []);

  const onAddTracker = useCallback(() => navigate('/compendium/create/trackers/create'), []);

  const onTrackerClick = useCallback(
    (item: { name: string }) => navigate(`/compendium/create/trackers/${item.name}`),
    [],
  );

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
      <List items={items} onListItemClick={onTrackerClick} />
    </LayoutConfig>
  );
};

TrackersList.displayName = 'TrackersList';

export default TrackersList;
