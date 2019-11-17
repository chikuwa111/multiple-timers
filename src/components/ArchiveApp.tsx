import React, { Dispatch } from 'react';
import { State } from '../type';
import { Action } from '../action';
import ArchivedTimer from './ArchivedTimer';
import { FlexStartContainer, FlexComponent } from './ui/Flex';

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

export default function ArchiveApp({ state, dispatch }: Props) {
  const { archivedTimers } = state;

  return (
    <FlexStartContainer>
      {archivedTimers.map(timer => (
        <FlexComponent key={timer.id}>
          <ArchivedTimer timer={timer} dispatch={dispatch} />
        </FlexComponent>
      ))}
    </FlexStartContainer>
  );
}
