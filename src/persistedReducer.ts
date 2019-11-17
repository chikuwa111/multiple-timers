import { useReducer, useEffect } from 'react';
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
      if (state != null) dispatch(load({ ...initialState, ...state }));
    });
  }, [dispatch]);

  useEffect(() => {
    if (state !== initialState) saveState(state);
  }, [state]);

  return [state, dispatch] as const;
}
