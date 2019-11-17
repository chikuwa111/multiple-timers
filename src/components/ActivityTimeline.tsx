import React, { useMemo } from 'react';
import { TimerActivity, State } from '../type';
import Activity from './Activity';

type Props = {
  state: State;
};

export default function ActivityTimeline({ state }: Props) {
  const { timers, archivedTimers } = state;

  const activities = useMemo(
    () =>
      [...timers, ...archivedTimers]
        .flatMap(timer => {
          const timerActivities: TimerActivity[] = [];
          const { id, label, actions } = timer;
          for (let i = 0; i < actions.length; i += 2) {
            const startAction = actions[i];
            const stopAction = actions[i + 1];
            if (stopAction != null) {
              timerActivities.push({
                timerId: id,
                timerLabel: label,
                startUnixMilliseconds: startAction.unixMilliseconds,
                stopUnixMilliseconds: stopAction.unixMilliseconds,
              });
            }
          }
          return timerActivities;
        })
        .sort((a, b) => b.stopUnixMilliseconds - a.stopUnixMilliseconds),
    [timers, archivedTimers]
  );

  return (
    <>
      {activities.map(activity => (
        <Activity
          key={`${activity.timerId}-${activity.startUnixMilliseconds}`}
          {...activity}
        />
      ))}
    </>
  );
}
