import React, {
  createContext, useContext, useMemo, useReducer,
} from 'react';

import { CompendiumMeta } from 'core/Compendium';

type Form = {
  meta: Partial<CompendiumMeta>;
};

type CompendiumFormActions = { type: 'meta'; meta: Form['meta'] };

type CompendiumFormContext = {
  data: Form;
  dispatch: React.Dispatch<CompendiumFormActions>;
};

const defaultContext: CompendiumFormContext = {
  data: {
    meta: {},
  },
  dispatch: () => {},
};

const Context = createContext<CompendiumFormContext>(defaultContext);

Context.displayName = 'CompendiumFormContext';

const reducer = (state: Form, action: CompendiumFormActions): Form => {
  switch (action.type) {
    case 'meta': return {
      ...state,
      meta: {
        ...state.meta,
        ...action.meta,
      },
    };

    default: return state;
  }
};

export const useCompendiumForm = () => useContext<CompendiumFormContext>(Context);

export const withCompendiumFormContext = <P extends Record<string, unknown>>(
  Comp: React.FunctionComponent<P>,
) => {
  const WrappedComp = (props: P) => {
    const [data, dispatch] = useReducer(reducer, defaultContext.data);

    const value = useMemo(() => ({ data, dispatch }), [data]);

    return (
      <Context.Provider value={value}>
        <Comp {...props} />
      </Context.Provider>
    );
  };

  WrappedComp.displayName = `withCompendiumFormContext(${Comp.displayName})`;

  return WrappedComp;
};
