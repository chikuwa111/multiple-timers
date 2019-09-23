import React, { Dispatch, useState, useEffect, useMemo } from 'react';
import { Timer } from '../type';
import { Action } from '../action';
import {
  convertMillisecondsToTime,
  calcCurrentMilliseconds,
  bindTimerAction,
} from '../timer';
import { FlexContainer } from './ui/Flex';
import Button, { FullWidthButton } from './ui/Button';
import { TimeWrapper } from './ui/Time';
import { Margin1Rem } from './ui/Margin';
import Label from './ui/Label';

type Props = {
  timer: Timer;
  dispatch: Dispatch<Action>;
};

export default function FixedTimer({ timer, dispatch }: Props) {
  const { id, label, milliseconds, actions } = timer;

  const [currentMilliseconds, setCurrentMilliseconds] = useState(
    calcCurrentMilliseconds(milliseconds, actions)
  );

  const isMoving = useMemo(() => actions[actions.length - 1].type === 'START', [
    actions,
  ]);
  useEffect(() => {
    if (isMoving) {
      const id = setInterval(() => {
        setCurrentMilliseconds(calcCurrentMilliseconds(milliseconds, actions));
      }, 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [milliseconds, actions, isMoving, setCurrentMilliseconds]);

  const { hoursString, minutesString, secondsString } = useMemo(
    () => convertMillisecondsToTime(currentMilliseconds),
    [currentMilliseconds]
  );
  const { startTimer, stopTimer, removeTimer } = useMemo(
    () => bindTimerAction(id, dispatch),
    [id, dispatch]
  );

  return (
    <div>
      <FlexContainer>
        <Button color="lightcoral" onClick={removeTimer}>
          ✖︎
        </Button>
        <Label>{label}</Label>
      </FlexContainer>
      <Margin1Rem />
      <TimeWrapper>
        {`${hoursString}：${minutesString}：${secondsString}`}
      </TimeWrapper>
      <Margin1Rem />
      {isMoving ? (
        <FullWidthButton primary={true} color="lightcoral" onClick={stopTimer}>
          ■
        </FullWidthButton>
      ) : (
        <FullWidthButton
          primary={true}
          color="mediumseagreen"
          onClick={startTimer}
        >
          ▶︎
        </FullWidthButton>
      )}
      <Margin1Rem />
    </div>
  );
}
