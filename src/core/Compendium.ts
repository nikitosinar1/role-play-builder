import IdGenerator from 'core/IdGenerator';

export type CompendiumMeta = {
  name: string;
  version: string;
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
