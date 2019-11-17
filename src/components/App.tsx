import React, { useState } from 'react';
import usePersistedReducer from '../persistedReducer';
import TimerApp from './TimerApp';
import ActivityTimeline from './ActivityTimeline';
import Container from './ui/Container';
import { PlayIcon, ListBoxIcon } from './ui/Icon';
import { BottomNavigation, BottomNavItem } from './ui/BottomNavigation';

enum APP {
  TIMER,
  TIMELINE,
}

export default function App() {
  const [state, dispatch] = usePersistedReducer();
  const [app, setApp] = useState<APP>(APP.TIMER);

  return (
    <>
      <Container>
        {app === APP.TIMER && <TimerApp state={state} dispatch={dispatch} />}
        {app === APP.TIMELINE && <ActivityTimeline state={state} />}
      </Container>
      <BottomNavigation>
        <BottomNavItem
          active={app === APP.TIMER}
          onClick={() => setApp(APP.TIMER)}
        >
          <PlayIcon />
        </BottomNavItem>
        <BottomNavItem
          active={app === APP.TIMELINE}
          onClick={() => setApp(APP.TIMELINE)}
        >
          <ListBoxIcon />
        </BottomNavItem>
      </BottomNavigation>
    </>
  );
}
