/* eslint-disable no-param-reassign */
import Compendium from 'core/Compendium';
import compendiumImage from 'assets/images/compendium-example.png';
import Character from 'core/Character';
import characterImage from 'assets/images/character-example.png';

export const generateCompendium = (i: number) => new Compendium({
  name: `Compendium ${i}`,
  version: (Math.random() * 10).toFixed(1),
  thumbnail: Math.random() >= 0.5 ? compendiumImage : undefined,
});

export const generateCharacter = (comp: Compendium) => (i: number) => new Character(comp.id, {
  name: `Character ${i}`,
  description: 'test, one more test, etc.',
  thumbnail: Math.random() >= 0.5 ? characterImage : undefined,
});

export const compendiumList = [1, 2, 3, 4, 5].map(generateCompendium);

export const characters = compendiumList.reduce((ac, comp) => {
  ac[comp.id] = [1, 2, 3].map(generateCharacter(comp));
  return ac;
}, {} as { [key: Compendium['id']]: Character[] });
