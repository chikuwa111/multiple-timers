import React, { Dispatch } from 'react';
import { Timer } from '../type';
import { Action } from '../action';
import NewTimer from './NewTimer';
import FixedTimer from './FixedTimer';

type Props = {
  timer: Timer;
  dispatch: Dispatch<Action>;
};

export default function Timer({ timer, dispatch }: Props) {
  const isNew = timer.actions.length === 0;
  if (isNew) {
    return <NewTimer timer={timer} dispatch={dispatch} />;
  } else {
    return <FixedTimer timer={timer} dispatch={dispatch} />;
  }
}
