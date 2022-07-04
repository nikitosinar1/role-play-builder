import React, {
  createContext, useContext, useMemo, useReducer,
} from 'react';

import Compendium from 'core/Compendium';
import Tracker from 'core/Tracker';

type Form = {
  meta: Partial<Compendium['meta']>;
  trackers: Compendium['trackers'];
  characterPreview: Partial<Compendium['characterPreview']>;
};

type CompendiumFormActions =
    { type: 'meta'; meta: Form['meta'] } |
    { type: 'tracker-create'; tracker: Tracker } |
    { type: 'tracker-delete'; name: Tracker['name'] } |
    { type: 'tracker-update'; oldTrackerName: Tracker['name']; tracker: Tracker } |
    { type: 'character-preview'; preview: Form['characterPreview'] };

type CompendiumFormContext = {
  data: Form;
  dispatch: React.Dispatch<CompendiumFormActions>;
};

const defaultContext: CompendiumFormContext = {
  data: {
    meta: {},
    trackers: [],
    characterPreview: {},
  },
  dispatch: () => {},
};

const Context = createContext<CompendiumFormContext>(defaultContext);

Context.displayName = 'CompendiumFormContext';

const reducer = (state: Form, action: CompendiumFormActions): Form => {
  switch (action.type) {
    case 'meta': return {
      ...state,
      meta: { ...state.meta, ...action.meta },
    };

    case 'tracker-create': {
      const trackers = state.trackers.filter(({ name }) => name !== action.tracker.name);

      return {
        ...state,
        trackers: [...trackers, action.tracker],
      };
    }

    case 'tracker-update': {
      const trackers = state.trackers
        .filter(({ name }) => ![action.tracker.name, action.oldTrackerName].includes(name));

      return {
        ...state,
        trackers: [...trackers, action.tracker],
      };
    }

    case 'tracker-delete': return {
      ...state,
      trackers: state.trackers.filter(({ name }) => name !== action.name),
    };

    case 'character-preview': return {
      ...state,
      characterPreview: { ...state.characterPreview, ...action.preview },
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
