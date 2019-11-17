import React, { useState, useEffect } from 'react';
import usePersistedReducer from '../persistedReducer';
import TimerApp from './TimerApp';
import ActivityTimeline from './ActivityTimeline';
import ArchiveApp from './ArchiveApp';
import Container from './ui/Container';
import { PlayIcon, ListBoxIcon, ArchiveIcon } from './ui/Icon';
import { BottomNavigation, BottomNavItem } from './ui/BottomNavigation';

enum APP {
  TIMER,
  ARCHIVE,
  TIMELINE,
}

export default function App() {
  const [state, dispatch] = usePersistedReducer();
  const [app, setApp] = useState<APP>(APP.TIMER);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [app]);

  return (
    <>
      <Container>
        {app === APP.TIMER && <TimerApp state={state} dispatch={dispatch} />}
        {app === APP.ARCHIVE && (
          <ArchiveApp state={state} dispatch={dispatch} />
        )}
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
          active={app === APP.ARCHIVE}
          onClick={() => setApp(APP.ARCHIVE)}
        >
          <ArchiveIcon />
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
