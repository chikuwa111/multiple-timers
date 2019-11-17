import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { TimerActivity } from '../type';
import { TextBox, LargeText, Text } from './ui/TextBox';
import { Margin025Rem } from './ui/Margin';

type Props = TimerActivity;

export default function Activity({
  timerLabel,
  startUnixMilliseconds,
  stopUnixMilliseconds,
}: Props) {
  const today = new Date();
  const todayFullYear = today.getFullYear();
  const todayMonthIndex = today.getMonth();
  const todayDate = today.getDate();

  const activityTimeString = useMemo(
    () =>
      generateActivityTimeString(
        startUnixMilliseconds,
        stopUnixMilliseconds,
        todayFullYear,
        todayMonthIndex,
        todayDate
      ),
    [
      startUnixMilliseconds,
      stopUnixMilliseconds,
      todayFullYear,
      todayMonthIndex,
      todayDate,
    ]
  );

  return (
    <TextBox>
      <LargeText>{timerLabel}</LargeText>
      <Margin025Rem />
      <Text>{activityTimeString}</Text>
    </TextBox>
  );
}

const generateActivityTimeString = (
  startUnixMilliseconds: number,
  stopUnixMilliseconds: number,
  todayFullYear: number,
  todayMonthIndex: number,
  todayDate: number
) => {
  const startDate = dayjs(startUnixMilliseconds);
  const stopDate = dayjs(stopUnixMilliseconds);
  const today = dayjs(new Date(todayFullYear, todayMonthIndex, todayDate));

  if (startDate.isSame(today, 'date')) {
    return `${startDate.format('HH:mm')} - ${stopDate.format('HH:mm')}`;
  }
  if (startDate.isSame(today, 'year')) {
    if (startDate.isSame(stopDate, 'date')) {
      return `${startDate.format('M/D HH:mm')} - ${stopDate.format('HH:mm')}`;
    }
    return `${startDate.format('M/D HH:mm')} - ${stopDate.format('M/D HH:mm')}`;
  }
  if (startDate.isSame(stopDate, 'date')) {
    return `${startDate.format('YYYY/M/D HH:mm')} - ${stopDate.format(
      'HH:mm'
    )}`;
  }
  if (startDate.isSame(stopDate, 'year')) {
    return `${startDate.format('YYYY M/D HH:mm')} - ${stopDate.format(
      'M/D HH:mm'
    )}`;
  }
  return `${startDate.format('YYYY/M/D HH:mm')} - ${stopDate.format(
    'YYYY/M/D HH:mm'
  )}`;
};
