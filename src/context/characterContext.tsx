import React, {
  createContext, useContext, useMemo, useReducer,
} from 'react';

import Character from 'core/Character';
import { generateCharacter } from '../dummyData';
import Compendium from 'core/Compendium';
import { useCompendium } from 'context/compendiumContext';

type CharacterActions =
    { type: 'remove'; id: Character['id'] } |
    { type: 'copy'; id: Character['id'] } |
    { type: 'create'; compendiumId: Compendium['id'] };

type CharacterContext = {
  data: Character[];
  compendiumCharacters: Character[];
  dispatch: React.Dispatch<CharacterActions>;
};

const defaultCharacterContext: CharacterContext = {
  data: [],
  compendiumCharacters: [],
  dispatch: () => {},
};

const Context = createContext<CharacterContext>(defaultCharacterContext);

Context.displayName = 'CharacterContext';

const reducer = (state: Character[], action: CharacterActions): Character[] => {
  switch (action.type) {
    case 'remove': {
      return state.filter((i) => i.id !== action.id);
    }

    case 'copy': {
      const item = state.find((i) => i.id === action.id);
      if (!item) return state;
      return [...state, item.copy()];
    }

    case 'create': {
      return [...state, generateCharacter(action.compendiumId)()];
    }

    default: return state;
  }
};

export const useCharacter = () => useContext<CharacterContext>(Context);

export const withCharacterContext = <P extends Record<string, unknown>>(
  Comp: React.FunctionComponent<P>,
) => {
  const WrappedComp = (props: P) => {
    const [data, dispatch] = useReducer(reducer, defaultCharacterContext.data);
    const { selected } = useCompendium();

    const compendiumCharacters = useMemo(
      () => (selected ? data.filter((i) => i.compendiumId === selected.id) : []),
      [selected, data],
    );

    const value = useMemo(() => ({
      data,
      compendiumCharacters,
      dispatch,
    }), [data, compendiumCharacters]);

    return (
      <Context.Provider value={value}>
        <Comp {...props} />
      </Context.Provider>
    );
  };

  WrappedComp.displayName = `withCharacterContext(${Comp.displayName})`;

  return WrappedComp;
};
