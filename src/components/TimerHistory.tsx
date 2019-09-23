import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { TimerAction } from '../type';
import { convertMillisecondsToTime } from '../timer';
import {
  ArrowDropdownIcon,
  ArrowDroprightIcon,
  CheckmarkIcon,
  PlayIcon,
  PauseIcon,
} from './ui/Icon';

type Props = {
  initialMilliseconds: number;
  actions: TimerAction[];
};

export default function TimerHistory({ initialMilliseconds, actions }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { hoursString, minutesString, secondsString } = useMemo(
    () => convertMillisecondsToTime(initialMilliseconds),
    [initialMilliseconds]
  );

  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <label>
        {isOpen ? <ArrowDropdownIcon /> : <ArrowDroprightIcon />}history
      </label>
      {isOpen && (
        <CustomUl>
          <li>
            <CheckmarkIcon /> {hoursString}:{minutesString}:{secondsString}
          </li>
          {actions.map(action => (
            <li key={action.unixMilliseconds}>
              {action.type === 'START' ? <PlayIcon /> : <PauseIcon />}{' '}
              {new Date(action.unixMilliseconds).toLocaleString()}
            </li>
          ))}
        </CustomUl>
      )}
    </div>
  );
}

const CustomUl = styled.ul`
  list-style: none;
  margin: 0;
`;
