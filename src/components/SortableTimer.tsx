import React, { Dispatch } from 'react';
import { Timer } from '../type';
import { Action } from '../action';
import NewTimer from './NewTimer';
import FixedTimer from './FixedTimer';
import { FlexComponent } from './ui/Flex';
import { SortableElement } from 'react-sortable-hoc';

type Props = {
  timer: Timer;
  dispatch: Dispatch<Action>;
};

function Timer({ timer, dispatch }: Props) {
  const isNew = timer.actions.length === 0;
  return (
    <FlexComponent>
      {isNew ? (
        <NewTimer timer={timer} dispatch={dispatch} />
      ) : (
        <FixedTimer timer={timer} dispatch={dispatch} />
      )}
    </FlexComponent>
  );
}

export default SortableElement(Timer);
