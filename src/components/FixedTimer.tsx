import React, { Dispatch, useState, useEffect, useMemo } from 'react';
import { Timer } from '../type';
import { Action } from '../action';
import {
  convertMillisecondsToTime,
  calcElapsedMilliseconds,
  calcCurrentMilliseconds,
  bindTimerAction,
} from '../timer';
import TimerHistory from './TimerHistory';
import EditableLabel from './EditableLabel';
import DragIcon from './DragIcon';
import { FlexContainer } from './ui/Flex';
import Button, { FullWidthButton } from './ui/Button';
import { TimeWrapper, TimeText } from './ui/Time';
import { Margin1Rem } from './ui/Margin';
import { PlayIcon, PauseIcon, ArchiveIcon } from './ui/Icon';

type Props = {
  timer: Timer;
  dispatch: Dispatch<Action>;
};

export default function FixedTimer({ timer, dispatch }: Props) {
  const { id, label, milliseconds, actions } = timer;
  const elapsedMilliseconds = useMemo(() => calcElapsedMilliseconds(actions), [
    actions,
  ]);
  const isMoving = useMemo(() => actions[actions.length - 1].type === 'START', [
    actions,
  ]);
  const [currentMilliseconds, setCurrentMilliseconds] = useState(
    calcCurrentMilliseconds(milliseconds, elapsedMilliseconds, isMoving)
  );
  const isOver = useMemo(() => currentMilliseconds < 0, [currentMilliseconds]);

  useEffect(() => {
    if (isMoving) {
      const id = setInterval(() => {
        setCurrentMilliseconds(
          calcCurrentMilliseconds(milliseconds, elapsedMilliseconds, isMoving)
        );
      }, 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [milliseconds, elapsedMilliseconds, isMoving, setCurrentMilliseconds]);

  const { hoursString, minutesString, secondsString } = useMemo(
    () => convertMillisecondsToTime(Math.abs(currentMilliseconds)),
    [currentMilliseconds]
  );
  const { updateLabel, startTimer, stopTimer, archiveTimer } = useMemo(
    () => bindTimerAction(id, dispatch),
    [id, dispatch]
  );

  return (
    <div>
      <FlexContainer>
        <Button
          disabled={isMoving}
          color={isMoving ? 'gainsboro' : 'gray'}
          onClick={archiveTimer}
        >
          <ArchiveIcon />
        </Button>
        <EditableLabel body={label} onChange={updateLabel} />
        <DragIcon />
      </FlexContainer>
      <Margin1Rem />
      <TimeWrapper>
        <TimeText isOver={isOver}>
          {`${hoursString}：${minutesString}：${secondsString}`}
        </TimeText>
      </TimeWrapper>
      <Margin1Rem />
      {isMoving ? (
        <FullWidthButton primary={true} color="lightcoral" onClick={stopTimer}>
          <PauseIcon />
        </FullWidthButton>
      ) : (
        <FullWidthButton
          primary={true}
          color="mediumseagreen"
          onClick={startTimer}
        >
          <PlayIcon />
        </FullWidthButton>
      )}
      <Margin1Rem />
      <TimerHistory initialMilliseconds={milliseconds} actions={actions} />
    </div>
  );
}
