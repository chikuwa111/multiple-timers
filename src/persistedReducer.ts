import { useReducer, useEffect } from 'react';
// @ts-ignore
import localforage from 'localforage';
import throttle from 'lodash/throttle';
import reducer, { initialState } from './reducer';
import { load } from './action';
import { State } from './type';

const KEY = 'persisted-state';
const saveState = throttle(
  (state: State) => localforage.setItem(KEY, state),
  500
);
const loadState = (): Promise<State | null> => localforage.getItem(KEY);

export default function usePersistedReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadState().then(state => {
      if (state != null) dispatch(load(state));
    });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return [state, dispatch] as const;
}
