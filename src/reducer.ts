import nanoid from 'nanoid';
import { State } from './type';
import { Action } from './action';

export const initialState: State = {
  timers: [],
};

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD':
      return action.payload.state;
    case 'ADD':
      return {
        timers: [
          ...state.timers,
          {
            id: nanoid(),
            label: '',
            note: '',
            milliseconds: 30 * 60 * 1000,
            actions: [],
          },
        ],
      };
    case 'REMOVE':
      return {
        timers: state.timers.filter(timer => timer.id !== action.payload.id),
      };
    case 'UPDATE': {
      const { id, timer } = action.payload;
      return {
        timers: state.timers.map(t => (t.id !== id ? t : { ...t, ...timer })),
      };
    }
    case 'START':
      return {
        timers: state.timers.map(timer =>
          timer.id !== action.payload.id
            ? timer
            : {
                ...timer,
                actions: [
                  ...timer.actions,
                  { type: 'START', unixMilliseconds: Number(new Date()) },
                ],
              }
        ),
      };
    case 'STOP':
      return {
        timers: state.timers.map(timer =>
          timer.id !== action.payload.id
            ? timer
            : {
                ...timer,
                actions: [
                  ...timer.actions,
                  { type: 'STOP', unixMilliseconds: Number(new Date()) },
                ],
              }
        ),
      };
    case 'RESET':
      return {
        timers: state.timers.map(timer =>
          timer.id !== action.payload.id
            ? timer
            : {
                ...timer,
                actions: [],
              }
        ),
      };
    default: {
      const _: never = action; // eslint-disable-line @typescript-eslint/no-unused-vars
      return state;
    }
  }
}
