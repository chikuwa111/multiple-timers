import React, { useCallback } from 'react';
import usePersistedReducer from '../persistedReducer';
import { add } from '../action';
import Timer from './Timer';

export default function App() {
  const [state, dispatch] = usePersistedReducer();

  const addTimer = useCallback(() => {
    dispatch(add());
  }, [dispatch]);

  return (
    <div>
      <div>
        {state.timers.map(timer => (
          <Timer key={timer.id} timer={timer} dispatch={dispatch} />
        ))}
      </div>
      <button onClick={addTimer}>ADD</button>
    </div>
  );
}
