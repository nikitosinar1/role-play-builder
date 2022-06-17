import React, {
  createContext, useContext, useMemo, useReducer,
} from 'react';

import Compendium from 'core/Compendium';

type CompendiumState = {
  data: Compendium[];
};

type CompendiumActions =
    { type: 'remove'; id: Compendium['id'] } |
    { type: 'copy'; id: Compendium['id'] } |
    { type: 'create' };

type CompendiumContext = [CompendiumState, React.Dispatch<CompendiumActions>];

const defaultState: CompendiumState = {
  data: [],
};

const Context = createContext<CompendiumContext>([defaultState, () => {}]);

Context.displayName = 'CompendiumContext';

const reducer = (state: CompendiumState, action: CompendiumActions): CompendiumState => {
  switch (action.type) {
    case 'remove': {
      const data = state.data.filter((i) => i.id !== action.id);
      return { ...state, data };
    }

    case 'copy': {
      const item = state.data.find((i) => i.id === action.id);
      if (!item) return state;
      return {
        ...state,
        data: [...state.data, item.copy()],
      };
    }

    case 'create': {
      return {
        ...state,
        data: [...state.data, new Compendium({
          name: `Compendium ${state.data.length + 1}`,
          version: '1.0',
        })],
      };
    }

    default: return state;
  }
};

export const useCompendium = () => useContext<CompendiumContext>(Context);

export const withCompendiumContext = <P extends Record<string, unknown>>(
  Comp: React.FunctionComponent<P>,
) => {
  const WrappedComp = (props: P) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const value = useMemo<CompendiumContext>(() => [state, dispatch], [state]);

    return (
      <Context.Provider value={value}>
        <Comp {...props} />
      </Context.Provider>
    );
  };

  WrappedComp.displayName = `withCompendiumContext(${Comp.displayName})`;

  return WrappedComp;
};
