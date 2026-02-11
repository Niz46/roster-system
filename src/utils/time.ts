import { RosterEvent } from "../context/planner/planner.types";

export function generateTimeSlots(
  from = "08:00",
  to = "20:00",
  stepMins = 30,
): string[] {
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  const slots: string[] = [];
  const base = new Date();
  base.setHours(fh, fm, 0, 0);
  const end = new Date();
  end.setHours(th, tm, 0, 0);
  for (
    let d = new Date(base);
    d <= end;
    d = new Date(d.getTime() + stepMins * 60_000)
  ) {
    slots.push(d.toTimeString().slice(0, 5));
  }
  return slots;
}

export function computeIsoFromDateAndTime(date: string, time: string): string {
  const timeNormalized = time.length === 5 ? time : time.slice(0, 5);
  const local = new Date(`${date}T${timeNormalized}:00`);
  if (Number.isNaN(local.getTime())) {
    return new Date().toISOString();
  }
  return local.toISOString();
}

export function getDurationMs(startIso: string, endIso: string): number {
  const s = new Date(startIso).getTime();
  const e = new Date(endIso).getTime();
  return Math.max(0, e - s);
}

export function snapToStep(minutes: number, step = 15): number {
  return Math.round(minutes / step) * step;
}

export function calculateDropStartIso(params: {
  date: string;
  slotBaseTime: string;
  cellRectTop: number;
  clientY: number;
  dragOffsetY: number;
  cellHeightPx: number;
  slotStepMins: number;
  snapStepMins: number;
}): string {
  const {
    date,
    slotBaseTime,
    cellRectTop,
    clientY,
    dragOffsetY,
    cellHeightPx,
    slotStepMins,
    snapStepMins,
  } = params;

  const [h, m] = slotBaseTime.split(":").map(Number);
  const baseMinutes = h * 60 + m;

  const relativeY = clientY - cellRectTop - dragOffsetY;

  const ratio = relativeY / cellHeightPx;

  const minutesOffset = Math.round(ratio * slotStepMins);
  const unSnapped = baseMinutes + minutesOffset;
  const snapped = snapToStep(unSnapped, snapStepMins);

  const snappedHours = Math.floor(snapped / 60);
  const snappedMinutes = snapped % 60;
  const hh = String(snappedHours).padStart(2, "0");
  const mm = String(snappedMinutes).padStart(2, "0");

  return computeIsoFromDateAndTime(date, `${hh}:${mm}`);
}

export function hasOverlap(
  events: RosterEvent[],
  candidate: {
    id?: string;
    start: string;
    end: string;
    userId?: string;
    resourceId?: string;
  },
  options?: { checkUser?: boolean; checkResource?: boolean },
): { overlap: boolean; overlapping: RosterEvent[] } {
  const checkUser = options?.checkUser ?? true;
  const checkResource = options?.checkResource ?? true;
  const s = new Date(candidate.start).getTime();
  const e = new Date(candidate.end).getTime();

  const overlapping = events.filter((ev) => {
    if (candidate.id && ev.id === candidate.id) return false;
    const evs = new Date(ev.start).getTime();
    const eve = new Date(ev.end).getTime();
    const intersects = s < eve && e > evs;
    if (!intersects) return false;
    if (checkUser && candidate.userId && ev.userId === candidate.userId)
      return true;
    if (
      checkResource &&
      candidate.resourceId &&
      ev.resourceId === candidate.resourceId
    )
      return true;
    return false;
  });

  return { overlap: overlapping.length > 0, overlapping };
}
