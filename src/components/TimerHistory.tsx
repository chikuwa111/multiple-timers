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
      <CustomLabel>
        {isOpen ? <ArrowDropdownIcon /> : <ArrowDroprightIcon />}history
      </CustomLabel>
      {isOpen && (
        <CustomUl>
          <CustomLi>
            <CheckmarkIcon />
            <CustomSpan>
              {hoursString}:{minutesString}:{secondsString}
            </CustomSpan>
          </CustomLi>
          {actions.map(action => (
            <CustomLi key={action.unixMilliseconds}>
              {action.type === 'START' ? <PlayIcon /> : <PauseIcon />}
              <CustomSpan>
                {new Date(action.unixMilliseconds).toLocaleString()}
              </CustomSpan>
            </CustomLi>
          ))}
        </CustomUl>
      )}
    </div>
  );
}

const CustomLabel = styled.label`
  display: flex;
`;

const CustomUl = styled.ul`
  list-style: none;
  margin: 0;
`;

const CustomLi = styled.li`
  display: flex;
`;

const CustomSpan = styled.span`
  margin-left: 0.25rem;
`;
