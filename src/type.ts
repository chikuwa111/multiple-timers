type TimerAction = {
  type: 'START' | 'STOP';
  datetime: Date;
};

export type Timer = {
  id: string;
  label: string;
  millseconds: number;
  actions: TimerAction[];
};

export type State = {
  timers: Timer[];
};
