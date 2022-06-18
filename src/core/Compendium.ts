export type CompendiumMeta = {
  name: string;
  version: string;
  thumbnail?: string;
};

class Compendium {
  private static LAST_ID = 0;

  private static GENERATE_ID = () => {
    const id = Compendium.LAST_ID + 1;
    Compendium.LAST_ID = id;
    return `compendium${id}`;
  };

  id: string;

  constructor(
    public meta: CompendiumMeta,
  ) {
    this.id = Compendium.GENERATE_ID();
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
