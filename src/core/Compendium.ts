import IdGenerator from 'core/IdGenerator';

export type CompendiumMeta = {
  name: string;
  version: string;
  description?: string;
  thumbnail?: string;
};

class Compendium extends IdGenerator {
  constructor(
    public meta: CompendiumMeta,
  ) {
    super('compendium');
  }

  copy() {
    return new Compendium(this.meta);
  }
}

export default Compendium;

export const safeCompendiumCreation = (meta: Partial<Compendium['meta']>): Compendium => {
  if (!meta.name) throw new Error('EMPTY_NAME');
  if (!meta.version) throw new Error('EMPTY_VERSION');

  const fullMeta = meta as Compendium['meta'];

  return new Compendium(fullMeta);
};
