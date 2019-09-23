import { TimerAction } from './type';
import { Dispatch, ChangeEvent } from 'react';
import { Action, update, start, stop, remove } from './action';

export function convertMillisecondsToTime(milliseconds: number) {
  const millsecondsToSeconds = Math.floor(milliseconds / 1000);
  const seconds = millsecondsToSeconds % 60;
  const minutes = ((millsecondsToSeconds - seconds) / 60) % 60;
  const hours = ((millsecondsToSeconds - seconds) / 60 - minutes) / 60;
  const hoursString = `00${hours}`.slice(-2);
  const minutesString = `00${minutes}`.slice(-2);
  const secondsString = `00${seconds}`.slice(-2);
  return {
    hours,
    minutes,
    seconds,
    hoursString,
    minutesString,
    secondsString,
  };
}

export function calcRemainingMilliseconds(
  milliseconds: number,
  actions: TimerAction[]
): number {
  let remainingTime = actions.reduce((time, action) => {
    switch (action.type) {
      case 'START':
        return time + action.unixMilliseconds;
      case 'STOP':
        return time - action.unixMilliseconds;
      default: {
        const _: never = action.type; // eslint-disable-line @typescript-eslint/no-unused-vars
        return time;
      }
    }
  }, milliseconds);
  const isMoving = actions[actions.length - 1].type === 'START';
  if (isMoving) remainingTime -= Number(new Date());
  return remainingTime;
}

export function bindTimerAction(id: string, dispatch: Dispatch<Action>) {
  const updateLabel = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(update(id, { label: e.target.value }));
  const updateNote = (e: ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(update(id, { note: e.target.value }));
  const updateMilliseconds = (milliseconds: number) =>
    dispatch(update(id, { milliseconds }));

  const startTimer = () => dispatch(start(id));
  const stopTimer = () => dispatch(stop(id));
  const removeTimer = () => dispatch(remove(id));

  return {
    updateLabel,
    updateNote,
    updateMilliseconds,
    startTimer,
    stopTimer,
    removeTimer,
  };
}
