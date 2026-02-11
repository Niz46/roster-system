import React, { createContext, useReducer, useContext, useEffect } from "react";
import { PlannerState, PlannerAction } from "./planner.types";
import { plannerReducer, initialPlannerState } from "./planner.reducer";

type PlannerContextType = {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
};

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider: React.FC<{
  children: React.ReactNode;
  initial?: Partial<PlannerState>;
}> = ({ children, initial }) => {
  const [state, dispatch] = useReducer(plannerReducer, {
    ...initialPlannerState,
    ...initial,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("planner_state_v1");
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "LOAD_STATE", payload: parsed });
      }
    } catch (err) {
      console.warn("Failed to load planner state from localStorage", err);
    }
  }, []);

  useEffect(() => {
    try {
      const toStore = {
        view: state.view,
        date: state.date,
        events: state.events.filter((e) => e.status !== "published"),
      };
      localStorage.setItem("planner_state_v1", JSON.stringify(toStore));
    } catch (err) {
      console.warn("Failed to persist planner state", err);
    }
  }, [state.view, state.date, state.events]);

  return (
    <PlannerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlannerContext = () => {
  const ctx = useContext(PlannerContext);
  if (!ctx)
    throw new Error("usePlannerContext must be used inside PlannerProvider");
  return ctx;
};
