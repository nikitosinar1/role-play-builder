import React from 'react';

import Stack from '@mui/material/Stack';

import Card from '../../components/Card/Card';
import CreateButton from '../../components/CreateButton';

import dummyData from './dummyData';

const CompendiumList = () => (
  <>
    <Stack spacing={2}>
      {dummyData.map((item) => (
        <Card
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          image={item.img}
        />
      ))}
    </Stack>

    <CreateButton />
  </>
);

CompendiumList.displayName = 'CompendiumList';

export default CompendiumList;
