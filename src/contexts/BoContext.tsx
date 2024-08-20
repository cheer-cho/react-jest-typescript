import {
  Children,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { Bomb } from "types";

// define state type
type StateType = {
  bombs: Bomb[];
  isStartTimer: boolean;
  explodedCount: number;
};

// declare init state (will be used to pass in the provider)
export const initState: StateType = {
  bombs: [],
  isStartTimer: false,
  explodedCount: 0,
};

// ---- reducer ---- //

// context's reducer types
const enum REDUCER_ACTION_TYPE {
  START_TIMER,
  BOMB_EXPLODED,
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
// state hook => get bombs
type UseBombsHookType = {
  bombs: Bomb[];
};
export const useBombs = (): UseBombsHookType => {
  const {
    state: { bombs },
  } = useContext(BombContext);

  return { bombs };
};

// actions hook => startTimer, bombExploded
type UseBombActionsHookType = {
  startTimer: () => void;
  bombExploded: () => void;
};
export const useActions = (): UseBombActionsHookType => {
  const { startTimer, bombExploded } = useContext(BombContext);

  return { startTimer, bombExploded };
};
