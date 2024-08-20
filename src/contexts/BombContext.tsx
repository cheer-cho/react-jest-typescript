import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Bomb } from "@/types";

// define state type
type StateType = {
  bombs: Bomb[];
  isStartTimer: boolean;
  explodedCount: number;
  timer: number;
};

// declare init state (will be used to pass in the provider)
export const initState: StateType = {
  bombs: [],
  isStartTimer: false,
  explodedCount: 0,
  timer: 0,
};

// ---- reducer ---- //

// context's reducer types
const enum REDUCER_ACTION_TYPE {
  START_TIMER,
  BOMB_EXPLODED,
  TIMER_INCREASED,
}

// define reducer action
type ReduerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

// set context reducer
const reducer = (state: StateType, action: ReduerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.START_TIMER:
      return {
        ...state,
        isStartTimer: true,
      };
    case REDUCER_ACTION_TYPE.BOMB_EXPLODED:
      return {
        ...state,
        explodedCount: state.explodedCount + 1,
      };
    case REDUCER_ACTION_TYPE.TIMER_INCREASED:
      return {
        ...state,
        timer: state.timer + 1,
      };
  }
};

// define custom hooke to be used to set the initial state in useReducer
const useBombReducer = (initState: StateType) => {
  // use useReducer to store and update state using reducer
  const [state, dispatch] = useReducer(reducer, initState);

  const startTimer = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.START_TIMER }),
    []
  );

  const bombExploded = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.BOMB_EXPLODED }),
    []
  );

  const increaseTimer = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.TIMER_INCREASED }),
    []
  );

  useEffect(() => {
    if (state.isStartTimer) {
      const intervalId = setInterval(() => {
        if (state.explodedCount === state.bombs.length) {
          clearInterval(intervalId);
          return;
        }
        increaseTimer();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [state.isStartTimer, state.bombs, state.explodedCount]);

  return { state, startTimer, bombExploded };
};

type UseBombReducerType = ReturnType<typeof useBombReducer>;

// ---- context ---- //
// define init state of the context
const initBombContextState: UseBombReducerType = {
  state: initState,
  startTimer: () => {},
  bombExploded: () => {},
};

export const BombContext =
  createContext<UseBombReducerType>(initBombContextState);

type ChildrenType = {
  children?: ReactNode | undefined;
};

type BombProviderProps = ChildrenType & StateType;

// define Provider
export const BombProvider = ({
  children,
  ...initState
}: BombProviderProps): ReactElement => (
  <BombContext.Provider value={useBombReducer(initState)}>
    {children}
  </BombContext.Provider>
);

// ---- hooks ---- //
export const useBombContext = (): UseBombReducerType => {
  return useContext(BombContext);
};

// state hook => get bombs
type UseBombsHookType = {
  bombs: Bomb[];
  explodedCount: number;
  isStartTimer: boolean;
};
export const useBombs = (): UseBombsHookType => {
  const {
    state: { bombs, explodedCount, isStartTimer },
  } = useBombContext();

  return { bombs, explodedCount, isStartTimer };
};

// state hook => get timer
type UseTimerHookType = {
  timer: number;
};
export const useTimer = (): UseTimerHookType => {
  const {
    state: { timer },
  } = useBombContext();

  return { timer };
};

// actions hook => startTimer, bombExploded
type UseBombActionsHookType = {
  startTimer: () => void;
  bombExploded: () => void;
};
export const useActions = (): UseBombActionsHookType => {
  const { startTimer, bombExploded } = useBombContext();

  return { startTimer, bombExploded };
};
