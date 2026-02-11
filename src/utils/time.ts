export function generateTimeSlots(
  from = "08:00",
  to = "20:00",
  stepMins = 30,
): string[] {
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  const start = new Date();
  start.setHours(fh, fm, 0, 0);
  const end = new Date();
  end.setHours(th, tm, 0, 0);
  const slots: string[] = [];
  for (
    let d = new Date(start);
    d <= end;
    d = new Date(d.getTime() + stepMins * 60000)
  ) {
    slots.push(d.toTimeString().slice(0, 5));
  }
  return slots;
}

export function computeIsoFromDateAndTime(date: string, time: string) {
  const dt = new Date(`${date}T${time}:00`);
  return dt.toISOString();
}
