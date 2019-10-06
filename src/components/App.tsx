import React, { useCallback } from 'react';
// @ts-ignore
import arrayMove from 'array-move';
import usePersistedReducer from '../persistedReducer';
import { updateTimers, add } from '../action';
import SortableTimerList from './SortableTimerList';
import Container from './ui/Container';
import { FullWidthButton } from './ui/Button';
import { AddIcon } from './ui/Icon';

export default function App() {
  const [state, dispatch] = usePersistedReducer();
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
    <Container>
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
    </Container>
  );
}
