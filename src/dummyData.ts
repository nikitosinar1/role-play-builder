/* eslint-disable no-param-reassign,@typescript-eslint/naming-convention */
import Compendium from 'core/Compendium';
import compendiumImage from 'assets/images/compendium-example.png';
import Character from 'core/Character';
import characterImage from 'assets/images/character-example.png';

let _lastCompendium = 0;
const getLastCompendium = () => { _lastCompendium += 1; return _lastCompendium; };
export const generateCompendium = () => new Compendium({
  name: `Compendium ${getLastCompendium()}`,
  version: (Math.random() * 10).toFixed(1),
  thumbnail: Math.random() >= 0.5 ? compendiumImage : undefined,
});

let _lastCharacter = 0;
const getLastCharacter = () => { _lastCharacter += 1; return _lastCharacter; };
export const generateCharacter = (compId: Compendium['id']) => () => new Character(compId, {
  name: `Character ${getLastCharacter()}`,
  description: 'test, one more test, etc.',
  thumbnail: Math.random() >= 0.5 ? characterImage : undefined,
});

export const compendiumList = [1, 2, 3, 4, 5].map(generateCompendium);

export const characters = compendiumList.reduce(
  (ac, comp) => [...ac, ...[1, 2, 3].map(generateCharacter(comp.id))],
  [] as Character[],
);
