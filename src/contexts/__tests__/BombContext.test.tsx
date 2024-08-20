import { renderHook } from "@testing-library/react";
import {
  BombProvider,
  initState,
  useActions,
  useBombs,
  useTimer,
} from "@/contexts/BombContext";
import { Bomb } from "@/types";
import { act } from "react";

const mockBombs: Bomb[] = [
  { name: "Bomb A", initialTime: 5 },
  { name: "Bomb B", initialTime: 10 },
];

vi.useFakeTimers();

describe("BombContext", () => {
  it("should provide the initial state correctly", () => {
    const { result } = renderHook(() => useBombs(), {
      wrapper: ({ children }) => (
        <BombProvider {...initState} bombs={mockBombs}>
          {children}
        </BombProvider>
      ),
    });

    const { bombs, explodedCount, isStartTimer } = result.current;

    expect(bombs).toEqual(mockBombs);
    expect(explodedCount).toBe(0);
    expect(isStartTimer).toBe(false);
  });

  it("should start the timer when startTimer is called", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BombProvider {...initState} bombs={mockBombs}>
        {children}
      </BombProvider>
    );

    const { result } = renderHook(
      () => {
        const actions = useActions();
        const bombs = useBombs();
        return { actions, bombs };
      },
      { wrapper }
    );

    act(() => {
      result.current.actions.startTimer();
    });

    // Check if the timer has started
    expect(result.current.bombs.isStartTimer).toBe(true);
  });

  it("should increase the timer and explode bombs as time passes", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BombProvider {...initState} bombs={mockBombs}>
        {children}
      </BombProvider>
    );

    const { result } = renderHook(
      () => {
        const actions = useActions();
        const bombs = useBombs();
        const timer = useTimer();
        return { actions, bombs, timer };
      },
      { wrapper }
    );

    expect(result.current.timer.timer).toBe(0);

    act(() => {
      result.current.actions.startTimer();
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.timer.timer).toBe(3);
  });

  it("should increase the exploed count by 1 when bombExploded is called", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BombProvider {...initState} bombs={mockBombs}>
        {children}
      </BombProvider>
    );

    const { result } = renderHook(
      () => {
        const actions = useActions();
        const bombs = useBombs();
        const timer = useTimer();
        return { actions, bombs, timer };
      },
      { wrapper }
    );

    act(() => {
      result.current.actions.startTimer();
    });
    // advace time by 5s
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // simulate bombItem dispatch to tell its exploded
    act(() => {
      result.current.actions.bombExploded();
    });
    expect(result.current.bombs.explodedCount).toBe(1);
  });

  it("should stop timer when all bombs are exploded", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BombProvider {...initState} bombs={mockBombs}>
        {children}
      </BombProvider>
    );

    const { result } = renderHook(
      () => {
        const actions = useActions();
        const bombs = useBombs();
        const timer = useTimer();
        return { actions, bombs, timer };
      },
      { wrapper }
    );

    act(() => {
      result.current.actions.startTimer();
    });
    // advace time by 5s
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // simulate bombItem dispatch to tell its exploded
    act(() => {
      result.current.actions.bombExploded();
    });

    // advace time by another 5s
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    act(() => {
      result.current.actions.bombExploded();
    });

    // advace time by another 1s
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.bombs.explodedCount).toBe(2);
    expect(result.current.timer.timer).toBe(10);
  });
});
