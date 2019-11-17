import { Timer, State } from './type';

export const load = (state: State) => ({
  type: 'LOAD' as const,
  payload: { state },
});

export const updateTimers = (timers: Timer[]) => ({
  type: 'UPDATE_TIMERS' as const,
  payload: { timers },
});

export const add = () => ({
  type: 'ADD' as const,
});

export const archive = (id: string) => ({
  type: 'ARCHIVE' as const,
  payload: { id },
});

export const unarchive = (id: string) => ({
  type: 'UNARCHIVE' as const,
  payload: { id },
});

export const remove = (id: string) => ({
  type: 'REMOVE' as const,
  payload: { id },
});

export const update = (id: string, timer: Partial<Timer>) => ({
  type: 'UPDATE' as const,
  payload: { id, timer },
});

export const start = (id: string) => ({
  type: 'START' as const,
  payload: { id },
});

export const stop = (id: string) => ({
  type: 'STOP' as const,
  payload: { id },
});

export const reset = (id: string) => ({
  type: 'RESET' as const,
  payload: { id },
});

export type Action =
  | ReturnType<typeof load>
  | ReturnType<typeof updateTimers>
  | ReturnType<typeof add>
  | ReturnType<typeof archive>
  | ReturnType<typeof unarchive>
  | ReturnType<typeof remove>
  | ReturnType<typeof update>
  | ReturnType<typeof start>
  | ReturnType<typeof stop>
  | ReturnType<typeof reset>;
