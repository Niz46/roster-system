export type PlannerView = "live" | "planner";

export type EventStatus = "draft" | "published" | "locked";

export type UserStatus = "all" | "available" | "on_leave";

export type SidebarItemProps = {
  icon: React.ReactElement;
  label: string;
  isCollapsed: boolean;
};

export type SidebarContentProps = {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  showCollapseToggle?: boolean;
};

export type NestedMenuProps = {
  isCollapsed: boolean;
};

export interface User {
  id: string;
  name: string;
  initials: string;
  status: UserStatus;
  avatarUrl?: string;
}

export interface Resource {
  id: string;
  title: string;
  order?: number;
}

export interface RosterEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  userId: string;
  resourceId: string;
  status: EventStatus;
  color?: string;
  notes?: string;
}

export interface PlannerState {
  view: PlannerView;
  date: string;
  resources: Resource[];
  users: User[];
  events: RosterEvent[];
  loading: boolean;
  selectedEventId?: string | null;
  ui: {
    showDrafts: boolean;
  };
}

export type PlannerAction =
  | { type: "SET_VIEW"; payload: PlannerView }
  | { type: "SET_DATE"; payload: string }
  | { type: "LOAD_STATE"; payload: Partial<PlannerState> }
  | { type: "ADD_EVENT"; payload: RosterEvent }
  | { type: "UPDATE_EVENT"; payload: RosterEvent }
  | { type: "DELETE_EVENT"; payload: { id: string } }
  | { type: "SET_SELECTED_EVENT"; payload?: string | null }
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: User }
  | {
      type: "DRAG_EVENT";
      payload: {
        id: string;
        newStart: string;
        newEnd: string;
        newResourceId: string;
      };
    };
