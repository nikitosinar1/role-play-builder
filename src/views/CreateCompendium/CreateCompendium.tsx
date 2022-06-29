import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { withCompendiumFormContext } from 'context/compendiumFormContext';

import MainForm from './MainForm';
import MetaForm from './MetaForm';

const CreateCompendium = () => (
  <Routes>
    <Route path="/" element={<MainForm />} />
    <Route path="/meta" element={<MetaForm />} />
  </Routes>
);

CreateCompendium.displayName = 'CreateCompendium';

export default withCompendiumFormContext(CreateCompendium);
