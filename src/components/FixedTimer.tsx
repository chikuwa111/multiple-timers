import React, { Dispatch, useState, useEffect, useMemo } from 'react';
import { Timer } from '../type';
import { Action } from '../action';
import {
  convertMillisecondsToTime,
  calcRemainingMilliseconds,
  bindTimerAction,
} from '../timer';

type Props = {
  timer: Timer;
  dispatch: Dispatch<Action>;
};

export default function FixedTimer({ timer, dispatch }: Props) {
  const { id, label, note, milliseconds, actions } = timer;

  const [remainingMilliseconds, setRemainingMilliseconds] = useState(
    calcRemainingMilliseconds(milliseconds, actions)
  );

  const isMoving = useMemo(() => actions[actions.length - 1].type === 'START', [
    actions,
  ]);
  useEffect(() => {
    if (isMoving) {
      const id = setInterval(() => {
        setRemainingMilliseconds(
          calcRemainingMilliseconds(milliseconds, actions)
        );
      }, 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [milliseconds, actions, isMoving, setRemainingMilliseconds]);

  const { hoursString, minutesString, secondsString } = useMemo(
    () => convertMillisecondsToTime(remainingMilliseconds),
    [remainingMilliseconds]
  );
  const { startTimer, stopTimer, removeTimer } = useMemo(
    () => bindTimerAction(id, dispatch),
    [id, dispatch]
  );

  return (
    <div>
      <div>
        <span>{label}</span>
      </div>
      <div>
        <span>{hoursString}</span>
        <span> : </span>
        <span>{minutesString}</span>
        <span> : </span>
        <span>{secondsString}</span>
      </div>
      <div>
        {isMoving ? (
          <button onClick={stopTimer}>STOP</button>
        ) : (
          <button onClick={startTimer}>START</button>
        )}
      </div>
      <div>
        <div style={{ whiteSpace: 'pre' }}>{note}</div>
      </div>
      <div>
        <button onClick={removeTimer}>X</button>
      </div>
    </div>
  );
}
