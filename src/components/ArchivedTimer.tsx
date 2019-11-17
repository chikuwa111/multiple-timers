import React, { Dispatch, useMemo, useCallback } from 'react';
import { Timer } from '../type';
import { Action } from '../action';
import {
  convertMillisecondsToTime,
  calcElapsedMilliseconds,
  bindTimerAction,
  calcCurrentMilliseconds,
} from '../timer';
import TimerHistory from './TimerHistory';
import { FlexContainer } from './ui/Flex';
import Button from './ui/Button';
import { TimeWrapper, TimeText } from './ui/Time';
import { Margin1Rem } from './ui/Margin';
import { CloseIcon, ReturnLeftIcon } from './ui/Icon';
import Label from './ui/Label';

type Props = {
  timer: Timer;
  dispatch: Dispatch<Action>;
};

export default function ArchivedTimer({ timer, dispatch }: Props) {
  const { id, label, milliseconds, actions } = timer;
  const currentMilliseconds = useMemo(() => {
    const elapsedMilliseconds = calcElapsedMilliseconds(actions);
    return calcCurrentMilliseconds(milliseconds, elapsedMilliseconds, false);
  }, [actions, milliseconds]);
  const isOver = useMemo(() => currentMilliseconds < 0, [currentMilliseconds]);

  const { hoursString, minutesString, secondsString } = useMemo(
    () => convertMillisecondsToTime(Math.abs(currentMilliseconds)),
    [currentMilliseconds]
  );
  const { unarchiveTimer, removeTimer } = useMemo(
    () => bindTimerAction(id, dispatch),
    [id, dispatch]
  );

  const remove = useCallback(() => {
    if (confirm('Are you sure?')) removeTimer();
  }, [removeTimer]);

  return (
    <div>
      <FlexContainer>
        <Button color="lightcoral" onClick={remove}>
          <CloseIcon />
        </Button>
        <Label>{label}</Label>
        <Button color="mediumseagreen" onClick={unarchiveTimer}>
          <ReturnLeftIcon />
        </Button>
      </FlexContainer>
      <Margin1Rem />
      <TimeWrapper>
        <TimeText isOver={isOver}>
          {`${hoursString}：${minutesString}：${secondsString}`}
        </TimeText>
      </TimeWrapper>
      <Margin1Rem />
      <TimerHistory initialMilliseconds={milliseconds} actions={actions} />
    </div>
  );
}
