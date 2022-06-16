import { useCallback, useState } from 'react';

export default (
  initialValue = false,
): [
    boolean,
    () => void,
    () => void,
  ] => {
  const [state, setState] = useState(initialValue);

  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return [state, setTrue, setFalse];
};
