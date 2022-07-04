import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { withCompendiumFormContext } from 'context/compendiumFormContext';

import MainForm from './MainForm';
import MetaForm from './MetaForm';
import TrackersList from './TrackersList';
import TrackerForm from './TrackerForm';
import InterfacePreview from './InterfacePreview';

const CreateCompendium = () => (
  <Routes>
    <Route path="/" element={<MainForm />} />
    <Route path="/meta" element={<MetaForm />} />
    <Route path="/trackers" element={<TrackersList />} />
    <Route path="/trackers/create" element={<TrackerForm />} />
    <Route path="/trackers/:name" element={<TrackerForm />} />
    <Route path="/interface/preview" element={<InterfacePreview />} />
  </Routes>
);

CreateCompendium.displayName = 'CreateCompendium';

export default withCompendiumFormContext(CreateCompendium);
