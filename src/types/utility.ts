import { Params } from 'react-router-dom';

export type Lookup<T = number, S = string> = {
  id: T;
  title: S;
};

export type HandleType = {
  crumbTitle: string;
  storeKey?: string[];
  paramsKey?: string;
};

export type HandledMatch = {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: HandleType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHandleType = (handle: any): handle is HandleType => {
  return typeof handle?.crumbTitle === 'string';
};