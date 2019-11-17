import React, { useState } from 'react';
import usePersistedReducer from '../persistedReducer';
import TimerApp from './TimerApp';
import ActivityTimeline from './ActivityTimeline';
import Container from './ui/Container';
import { PlayIcon, ListBoxIcon } from './ui/Icon';
import { BottomNavigation, BottomNavItem } from './ui/BottomNavigation';

type App = 'TimerApp' | 'ActivityTimeline';

export default function App() {
  const [state, dispatch] = usePersistedReducer();
  const [app, setApp] = useState<App>('TimerApp');

  return (
    <>
      <Container>
        {app === 'TimerApp' && <TimerApp state={state} dispatch={dispatch} />}
        {app === 'ActivityTimeline' && <ActivityTimeline state={state} />}
      </Container>
      <BottomNavigation>
        <BottomNavItem
          active={app === 'TimerApp'}
          onClick={() => setApp('TimerApp')}
        >
          <PlayIcon />
        </BottomNavItem>
        <BottomNavItem
          active={app === 'ActivityTimeline'}
          onClick={() => setApp('ActivityTimeline')}
        >
          <ListBoxIcon />
        </BottomNavItem>
      </BottomNavigation>
    </>
  );
}
