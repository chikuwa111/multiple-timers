import { Timer, State } from './type';

export const load = (state: State) => ({
  type: 'LOAD' as const,
  payload: { state },
});

export const add = () => ({
  type: 'ADD' as const,
});

export const remove = (id: string) => ({
  type: 'REMOVE' as const,
  payload: { id },
});

export const update = (timer: Timer) => ({
  type: 'UPDATE' as const,
  payload: { timer },
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
  | ReturnType<typeof add>
  | ReturnType<typeof remove>
  | ReturnType<typeof update>
  | ReturnType<typeof start>
  | ReturnType<typeof stop>
  | ReturnType<typeof reset>;
