import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { usePlannerContext } from "../../context/planner/planner.context";
import { calculateDropStartIso, hasOverlap } from "../../utils/time";

interface TimeCellProps {
  time: string;
  resourceId: string;
  cellHeightPx: number;
  slotStepMins: number;
}

const TimeCell: React.FC<TimeCellProps> = ({
  time,
  resourceId,
  cellHeightPx,
  slotStepMins,
}) => {
  const cellRef = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = usePlannerContext();

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/plain");
    if (!raw) return;
    let payload: { id: string; offsetY: number; durationMs: number };
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = { id: raw, offsetY: 0, durationMs: 60 * 60 * 1000 };
    }

    const cellRect = cellRef.current?.getBoundingClientRect();
    if (!cellRect) return;

    const newStartIso = calculateDropStartIso({
      date: state.date,
      slotBaseTime: time,
      cellRectTop: cellRect.top,
      clientY: e.clientY,
      dragOffsetY: payload.offsetY ?? 0,
      cellHeightPx,
      slotStepMins,
      snapStepMins: 15,
    });

    const newEndIso = new Date(
      new Date(newStartIso).getTime() + (payload.durationMs ?? 60 * 60 * 1000),
    ).toISOString();

    const ev = state.events.find((x) => x.id === payload.id);
    const candidate = {
      id: payload.id,
      start: newStartIso,
      end: newEndIso,
      userId: ev?.userId,
      resourceId,
    };

    const overlapCheck = hasOverlap(state.events, candidate, {
      checkUser: true,
      checkResource: true,
    });
    if (overlapCheck.overlap) {
      console.warn(
        "Overlap detected with events:",
        overlapCheck.overlapping.map((o) => o.id),
      );
    }

    dispatch({
      type: "DRAG_EVENT",
      payload: {
        id: payload.id,
        newStart: newStartIso,
        newEnd: newEndIso,
        newResourceId: resourceId,
      },
    });
  };

  return (
    <Box
      ref={cellRef}
      onDragOver={onDragOver}
      onDrop={onDrop}
      h={`${cellHeightPx}px`}
      w="100%"
      position="relative"
      _hover={{ bg: "rgba(88, 101, 242, 0.02)" }}
    />
  );
};

export default TimeCell;
