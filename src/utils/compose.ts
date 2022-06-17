/* eslint-disable @typescript-eslint/no-explicit-any */
type Fn<A, B> = (a: A) => B;

const compose = <A, B>(
  fn1: Fn<any, B>,
  ...fns: [...Fn<any, any>[], Fn<A, any>]
): Fn<A, B> => fns.reduce((prevFn, nextFn) => (value: A) => prevFn(nextFn(value)), fn1);

export default compose;
