import React from "react";
import { Box } from "@chakra-ui/react";
import { Resource } from "../../context/planner/planner.types";
import { usePlannerContext } from "../../context/planner/planner.context";
import { computeIsoFromDateAndTime } from "../../utils/time";

const TimeCell: React.FC<{ time: string; resource: Resource }> = ({
  time,
  resource,
}) => {
  const { state, dispatch } = usePlannerContext();

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData("text/plain");
    if (!eventId) return;

    const newStart = computeIsoFromDateAndTime(state.date, time);

    const ev = state.events.find((x) => x.id === eventId);
    let durationMs = 60 * 60 * 1000;
    if (ev) {
      durationMs = new Date(ev.end).getTime() - new Date(ev.start).getTime();
    }
    const newEnd = new Date(
      new Date(newStart).getTime() + durationMs,
    ).toISOString();
    dispatch({
      type: "DRAG_EVENT",
      payload: { id: eventId, newStart, newEnd, newResourceId: resource.id },
    });
  };

  return (
    <Box
      onDragOver={onDragOver}
      onDrop={onDrop}
      h="60px"
      w="100%"
      position="relative"
    />
  );
};

export default TimeCell;
