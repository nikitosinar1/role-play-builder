import IdGenerator from 'core/IdGenerator';
import Tracker from 'core/Tracker';

type CompendiumMeta = {
  name: string;
  version: string;
  description?: string;
  thumbnail?: string;
};

class Compendium extends IdGenerator {
  constructor(
    public meta: CompendiumMeta,
    public trackers: Tracker[],
  ) {
    super('compendium');
  }

  copy() {
    return new Compendium(this.meta, this.trackers);
  }
}

export default Compendium;

export const safeCompendiumCreation = (meta: Partial<Compendium['meta']>, trackers: Compendium['trackers']): Compendium => {
  if (!meta.name) throw new Error('EMPTY_NAME');
  if (!meta.version) throw new Error('EMPTY_VERSION');

  const fullMeta = {
    ...meta,
    name: meta.name,
    version: meta.version,
  };

  return new Compendium(fullMeta, trackers);
};
