import nanoid from 'nanoid';
import { State } from './type';
import { Action } from './action';

export const initialState: State = {
  timers: [],
  archivedTimers: [],
};

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD':
      return action.payload.state;
    case 'UPDATE_TIMERS':
      return {
        ...state,
        timers: action.payload.timers,
      };
    case 'ADD':
      return {
        ...state,
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
    case 'ARCHIVE': {
      const timer = state.timers.find(timer => timer.id === action.payload.id);
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload.id),
        archivedTimers:
          timer != null
            ? [...state.archivedTimers, timer]
            : state.archivedTimers,
      };
    }
    case 'UNARCHIVE': {
      const timer = state.archivedTimers.find(
        timer => timer.id === action.payload.id
      );
      return {
        ...state,
        timers: timer != null ? [...state.timers, timer] : state.timers,
        archivedTimers: state.archivedTimers.filter(
          timer => timer.id !== action.payload.id
        ),
      };
    }
    case 'REMOVE':
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload.id),
        archivedTimers: state.archivedTimers.filter(
          timer => timer.id !== action.payload.id
        ),
      };
    case 'UPDATE': {
      const { id, timer } = action.payload;
      return {
        ...state,
        timers: state.timers.map(t => (t.id !== id ? t : { ...t, ...timer })),
      };
    }
    case 'START':
      return {
        ...state,
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
        ...state,
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
        ...state,
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
