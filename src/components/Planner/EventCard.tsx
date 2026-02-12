import React from "react";
import { Box, Text, Badge } from "@chakra-ui/react";
import { RosterEvent } from "../../context/planner/planner.types";
import { usePlannerContext } from "../../context/planner/planner.context";

const EventCard: React.FC<{ event: RosterEvent }> = ({ event }) => {
  const { dispatch } = usePlannerContext();

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const payload = JSON.stringify({
      id: event.id,
      offsetY,
      durationMs:
        new Date(event.end).getTime() - new Date(event.start).getTime(),
    });
    e.dataTransfer.setData("text/plain", payload);
    e.dataTransfer.effectAllowed = "move";
  };

  const onClick = () => {
    dispatch({ type: "SET_SELECTED_EVENT", payload: event.id });
  };

  const startTime = new Date(event.start).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(event.end).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      borderRadius="8px"
      borderWidth="1px"
      borderColor="gray.200"
      bg={event.color ?? "gray.50"}
      p={3}
      mb={2}
      cursor="grab"
      boxShadow="sm"
    >
      <Badge mb={1}>{event.userId}</Badge>
      <Text fontWeight="bold">{event.title}</Text>
      <Text fontSize="sm" color="gray.600">
        {startTime} - {endTime}
      </Text>
    </Box>
  );
};

export default EventCard;
