export type CompendiumMeta = {
  name: string;
  version: string;
  thumbnail?: string;
};

class Compendium {
  id: symbol;

  constructor(
    public meta: CompendiumMeta,
  ) {
    this.id = Symbol('compendium_id');
  }

  copy() {
    return new Compendium(this.meta);
  }

  toInit() {
    return { meta: this.meta };
  }

  toJSON() {
    return JSON.stringify(this.toInit());
  }
}

export default Compendium;
