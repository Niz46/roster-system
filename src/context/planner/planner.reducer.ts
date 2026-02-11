import { PlannerState, PlannerAction } from "./planner.types";

export const initialPlannerState: PlannerState = {
  view: "planner",
  date: new Date().toISOString().slice(0, 10),
  resources: [],
  users: [],
  events: [],
  loading: false,
  selectedEventId: null,
  ui: { showDrafts: true },
};

export function plannerReducer(
  state: PlannerState,
  action: PlannerAction,
): PlannerState {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e,
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload.id),
      };
    case "SET_SELECTED_EVENT":
      return { ...state, selectedEventId: action.payload ?? null };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        ),
      };
    case "DRAG_EVENT":
      return {
        ...state,
        events: state.events.map((ev) =>
          ev.id === action.payload.id
            ? {
                ...ev,
                start: action.payload.newStart,
                end: action.payload.newEnd,
                resourceId: action.payload.newResourceId,
              }
            : ev,
        ),
      };
    default:
      return state;
  }
}
