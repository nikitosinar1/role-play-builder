import React from 'react';

import { MemoryRouter } from 'react-router-dom';

export const withRouterContext = <P extends Record<string, unknown>>(
  Comp: React.FunctionComponent<P>,
) => {
  const WrappedComp = (props: P) => (
    <MemoryRouter>
      <Comp {...props} />
    </MemoryRouter>
  );

  WrappedComp.displayName = `withRouterContext(${Comp.displayName})`;

  return WrappedComp;
};
