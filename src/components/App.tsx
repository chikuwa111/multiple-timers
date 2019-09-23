import React, { useCallback } from 'react';
import usePersistedReducer from '../persistedReducer';
import { add } from '../action';
import Timer from './Timer';
import Container from './ui/Container';
import { FlexStartContainer, FlexComponent } from './ui/Flex';
import { FullWidthButton } from './ui/Button';
import { AddIcon } from './ui/Icon';

export default function App() {
  const [state, dispatch] = usePersistedReducer();

  const addTimer = useCallback(() => {
    dispatch(add());
  }, [dispatch]);

  return (
    <Container>
      <FlexStartContainer>
        {state.timers.map(timer => (
          <FlexComponent key={timer.id}>
            <Timer timer={timer} dispatch={dispatch} />
          </FlexComponent>
        ))}
      </FlexStartContainer>
      <FullWidthButton color="lightcoral" onClick={addTimer}>
        <AddIcon />
      </FullWidthButton>
    </Container>
  );
}
