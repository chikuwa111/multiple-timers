export type TimerAction = {
  type: 'START' | 'STOP';
  unixMilliseconds: number;
};

export type Timer = {
  id: string;
  label: string;
  note: string;
  milliseconds: number;
  actions: TimerAction[];
};

export type State = {
  timers: Timer[];
};
