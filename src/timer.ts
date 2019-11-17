import { TimerAction } from './type';
import { Dispatch, ChangeEvent } from 'react';
import {
  Action,
  update,
  start,
  stop,
  remove,
  archive,
  unarchive,
} from './action';

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

// NOTE: STARTが最後のアクション、すなわち稼働中のタイマーの場合は、求まる値がマイナスになる。
//       これはキャッシュ用の関数なので、以下の`calcCurrentMilliseconds`と合わせて使うこと。
export function calcElapsedMilliseconds(actions: TimerAction[]): number {
  return actions.reduce((time, action) => {
    switch (action.type) {
      case 'START':
        return time - action.unixMilliseconds;
      case 'STOP':
        return time + action.unixMilliseconds;
      default: {
        const _: never = action.type; // eslint-disable-line @typescript-eslint/no-unused-vars
        return time;
      }
    }
  }, 0);
}

export function calcCurrentMilliseconds(
  milliseconds: number,
  elapsedMilliseconds: number,
  isMoving: boolean
): number {
  if (isMoving) {
    return milliseconds - elapsedMilliseconds - Number(new Date());
  } else {
    return milliseconds - elapsedMilliseconds;
  }
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
  const archiveTimer = () => dispatch(archive(id));
  const unarchiveTimer = () => dispatch(unarchive(id));

  return {
    updateLabel,
    updateNote,
    updateMilliseconds,
    startTimer,
    stopTimer,
    removeTimer,
    archiveTimer,
    unarchiveTimer,
  };
}
