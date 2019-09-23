import React, { Dispatch, useCallback, ChangeEvent, useMemo } from 'react';
import { Timer as TimerType } from '../type';
import { Action } from '../action';
import { convertMillisecondsToTime, bindTimerAction } from '../timer';

type Props = {
  timer: TimerType;
  dispatch: Dispatch<Action>;
};

export default function NewTimer({ timer, dispatch }: Props) {
  const { id, label, note, milliseconds } = timer;

  const {
    hours,
    minutes,
    seconds,
    hoursString,
    minutesString,
    secondsString,
  } = useMemo(() => convertMillisecondsToTime(milliseconds), [milliseconds]);
  const {
    updateLabel,
    updateNote,
    updateMilliseconds,
    startTimer,
    removeTimer,
  } = useMemo(() => bindTimerAction(id, dispatch), [id, dispatch]);

  const updateHours = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = parseInt(e.target.value);
      if (Number.isNaN(value) || value < 0) value = 0;
      else if (value > 99) value = 99;
      updateMilliseconds(milliseconds + (value - hours) * 60 * 60 * 1000);
    },
    [milliseconds, hours, updateMilliseconds]
  );
  const updateMinutes = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = parseInt(e.target.value);
      if (Number.isNaN(value) || value < 0) value = 0;
      else if (value > 59) value = 59;
      updateMilliseconds(milliseconds + (value - minutes) * 60 * 1000);
    },
    [milliseconds, minutes, updateMilliseconds]
  );
  const updateSeconds = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = parseInt(e.target.value);
      if (Number.isNaN(value) || value < 0) value = 0;
      else if (value > 59) value = 59;
      updateMilliseconds(milliseconds + (value - seconds) * 1000);
    },
    [milliseconds, seconds, updateMilliseconds]
  );

  return (
    <div>
      <div>
        <input
          type="text"
          value={label}
          onChange={updateLabel}
          placeholder="label"
        />
      </div>
      <div>
        <input
          type="number"
          min="0"
          max="99"
          value={hoursString}
          onChange={updateHours}
        />
        <span> : </span>
        <input
          type="number"
          min="0"
          max="59"
          value={minutesString}
          onChange={updateMinutes}
        />
        <span> : </span>
        <input
          type="number"
          min="0"
          max="59"
          value={secondsString}
          onChange={updateSeconds}
        />
      </div>
      <div>
        <button onClick={startTimer}>START</button>
      </div>
      <div>
        <textarea value={note} onChange={updateNote} placeholder="note" />
      </div>
      <div>
        <button onClick={removeTimer}>X</button>
      </div>
    </div>
  );
}
