/* eslint-disable no-param-reassign,@typescript-eslint/naming-convention */
import Compendium from 'core/Compendium';
import Character from 'core/Character';
import characterImage from 'assets/images/character-example.png';

let _lastCharacter = 0;
const getLastCharacter = () => { _lastCharacter += 1; return _lastCharacter; };
export const generateCharacter = (compId: Compendium['id']) => () => new Character(compId, {
  name: `Character ${getLastCharacter()}`,
  description: 'test, one more test, etc.',
  thumbnail: Math.random() >= 0.5 ? characterImage : undefined,
});
