import React from 'react';
import usePersistedReducer from '../persistedReducer';
import TimerApp from './TimerApp';
import ActivityTimeline from './ActivityTimeline';
import Container from './ui/Container';

export default function App() {
  const [state, dispatch] = usePersistedReducer();

  return (
    <Container>
      <TimerApp state={state} dispatch={dispatch} />
      <ActivityTimeline state={state} />
    </Container>
  );
}
