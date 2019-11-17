import React, { useCallback, Dispatch } from 'react';
import arrayMove from 'array-move';
import { State } from '../type';
import { updateTimers, add, Action } from '../action';
import SortableTimerList from './SortableTimerList';
import { FullWidthButton } from './ui/Button';
import { AddIcon } from './ui/Icon';

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

export default function TimerApp({ state, dispatch }: Props) {
  const { timers } = state;

  const addTimer = useCallback(() => {
    dispatch(add());
  }, [dispatch]);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      dispatch(updateTimers(arrayMove(timers, oldIndex, newIndex)));
    },
    [dispatch, timers]
  );

  return (
    <>
      <SortableTimerList
        axis="xy"
        useDragHandle={true}
        useWindowAsScrollContainer={true}
        onSortEnd={onSortEnd}
        timers={timers}
        dispatch={dispatch}
      />
      <FullWidthButton color="lightcoral" onClick={addTimer}>
        <AddIcon />
      </FullWidthButton>
    </>
  );
}
