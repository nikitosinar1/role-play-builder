import React, {
  createContext, useContext, useMemo, useReducer,
} from 'react';

import { useMatch } from 'react-router-dom';

import Compendium from 'core/Compendium';
import { compendiumList, generateCompendium } from '../dummyData';

type CompendiumActions =
    { type: 'remove'; id: Compendium['id'] } |
    { type: 'copy'; id: Compendium['id'] } |
    { type: 'create' };

type State = Compendium[];

type CompendiumContext = {
  data: State;
  selected: Compendium | null;
  dispatch: React.Dispatch<CompendiumActions>;
};

const defaultContext: CompendiumContext = {
  data: compendiumList,
  selected: null,
  dispatch: () => {},
};

const Context = createContext<CompendiumContext>(defaultContext);

Context.displayName = 'CompendiumContext';

const reducer = (state: State, action: CompendiumActions): State => {
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
      return [...state, generateCompendium()];
    }

    default: return state;
  }
};

export const useCompendium = () => useContext<CompendiumContext>(Context);

const compIdRouterPattern = { path: '/:id', end: false };

export const withCompendiumContext = <P extends Record<string, unknown>>(
  Comp: React.FunctionComponent<P>,
) => {
  const WrappedComp = (props: P) => {
    const match = useMatch(compIdRouterPattern);
    const [data, dispatch] = useReducer(reducer, defaultContext.data);

    const selectedId = match?.params?.id;
    const selected = useMemo(
      () => data.find((i) => i.id === selectedId) || null,
      [data, selectedId],
    );

    const value = useMemo(() => ({
      data,
      selected,
      dispatch,
    }), [data, selected]);

    return (
      <Context.Provider value={value}>
        <Comp {...props} />
      </Context.Provider>
    );
  };

  WrappedComp.displayName = `withCompendiumContext(${Comp.displayName})`;

  return WrappedComp;
};
