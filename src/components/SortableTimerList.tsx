import React, { Dispatch } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { Timer as TimerType } from '../type';
import { Action } from '../action';
import SortableTimer from './SortableTimer';
import { FlexStartContainer } from './ui/Flex';

type Props = {
  timers: TimerType[];
  dispatch: Dispatch<Action>;
};

function TimerList({ timers, dispatch }: Props) {
  return (
    <FlexStartContainer>
      {timers.map((timer, index) => (
        <SortableTimer
          key={timer.id}
          index={index}
          timer={timer}
          dispatch={dispatch}
        />
      ))}
    </FlexStartContainer>
  );
}

export default SortableContainer(TimerList);
