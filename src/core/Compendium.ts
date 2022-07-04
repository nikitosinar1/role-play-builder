import IdGenerator from 'core/IdGenerator';
import Tracker from 'core/Tracker';

type CompendiumMeta = {
  name: string;
  version: string;
  description?: string;
  thumbnail?: string;
};

type CharacterPreview = {
  thumbnail?: Tracker<'image'>['name'];
  title: string;
  subtitle?: string;
};

class Compendium extends IdGenerator {
  constructor(
    public meta: CompendiumMeta,
    public trackers: Tracker[],
    public characterPreview: CharacterPreview,
  ) {
    super('compendium');
  }

  copy() {
    return new Compendium(this.meta, this.trackers, this.characterPreview);
  }
}

export default Compendium;

export const safeCompendiumCreation = (
  meta: Partial<Compendium['meta']>,
  trackers: Compendium['trackers'],
  characterPreview: Partial<CharacterPreview>,
): Compendium => {
  if (!meta.name) throw new Error('EMPTY_NAME');
  if (!meta.version) throw new Error('EMPTY_VERSION');

  const fullMeta = {
    ...meta,
    name: meta.name,
    version: meta.version,
  };

  if (!characterPreview.title) throw new Error('EMPTY_PREVIEW_TITLE');

  const fullCharacterPreview = {
    ...characterPreview,
    title: characterPreview.title,
  };

  return new Compendium(fullMeta, trackers, fullCharacterPreview);
};
