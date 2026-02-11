import { Box, Text, Badge } from "@chakra-ui/react";
import React from "react";
import { RosterEvent } from "../../context/planner/planner.types";
import { usePlannerContext } from "../../context/planner/planner.context";

const EventCard: React.FC<{ event: RosterEvent }> = ({ event }) => {
  const { dispatch } = usePlannerContext();

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", event.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onClick = () =>
    dispatch({ type: "SET_SELECTED_EVENT", payload: event.id });

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
      <Badge>{event.userId}</Badge>
      <Text fontWeight="bold">{event.title}</Text>
      <Text fontSize="sm" color="gray.600">
        {new Date(event.start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        -{" "}
        {new Date(event.end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </Box>
  );
};

export default EventCard;
