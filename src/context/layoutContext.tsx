import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

import Layout from 'components/Layout/Layout';

type LayoutConfigType = {
  title: React.ReactNode;
  hasMenu: boolean;
  onAddClick: (() => void) | null;
  onBackClick: (() => void) | null;
  footer: 'characters' | 'compendium' | 'bookmarks' | 'search' | null;
};

type LayoutContext = LayoutConfigType & {
  setConfig: (config: LayoutConfigType) => void;
};

const defaultLayoutConfig: LayoutContext = {
  title: '',
  hasMenu: false,
  onAddClick: null,
  onBackClick: null,
  footer: null,
  setConfig: () => {},
};

const Context = createContext<LayoutContext>(defaultLayoutConfig);

export const useLayoutContext = () => useContext(Context);

export const LayoutConfig = (props: Partial<LayoutConfigType>) => {
  const context = useLayoutContext();

  useEffect(() => {
    context.setConfig({
      ...defaultLayoutConfig,
      ...props,
    });
  }, []);

  return null;
};

LayoutConfig.displayName = 'LayoutConfig';

export const withLayoutContext = <P extends Record<string, unknown>>(
  Comp: React.FunctionComponent<P>,
) => {
  const WrappedComp = (props: P) => {
    const [config, setConfig] = useState<LayoutConfigType>(defaultLayoutConfig);

    const value = useMemo(() => ({ ...config, setConfig }), [config]);

    return (
      <Context.Provider value={value}>
        <Layout>
          <Comp {...props} />
        </Layout>
      </Context.Provider>
    );
  };

  WrappedComp.displayName = `withLayoutContext(${Comp.displayName})`;

  return WrappedComp;
};
