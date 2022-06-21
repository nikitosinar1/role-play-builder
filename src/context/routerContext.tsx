import React from 'react';

import { BrowserRouter } from 'react-router-dom';

export const withRouterContext = <P extends Record<string, unknown>>(
  Comp: React.FunctionComponent<P>,
) => {
  const WrappedComp = (props: P) => (
    <BrowserRouter>
      <Comp {...props} />
    </BrowserRouter>
  );

  WrappedComp.displayName = `withRouterContext(${Comp.displayName})`;

  return WrappedComp;
};
