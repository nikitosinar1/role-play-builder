import IdGenerator from 'core/IdGenerator';
import Compendium from 'core/Compendium';

type CharacterMeta = {
  name: string;
  description?: string;
  thumbnail?: string;
};

class Character extends IdGenerator {
  constructor(
    public compendiumId: Compendium['id'],
    public meta: CharacterMeta,
  ) {
    super('character');
  }

  copy() {
    return new Character(this.compendiumId, this.meta);
  }
}

export default Character;
