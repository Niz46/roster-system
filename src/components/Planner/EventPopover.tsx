import React from "react";
import { Box, VStack, Text, Badge } from "@chakra-ui/react";
import { RosterEvent } from "../../context/planner/planner.types";

const EventPopover: React.FC<{ events: RosterEvent[] }> = ({ events }) => {
  return (
    <Box>
      <VStack gap={2} align="stretch">
        {events.map((ev) => (
          <Box
            key={ev.id}
            p={2}
            borderRadius="md"
            bg="white"
            borderWidth="1px"
            borderColor="gray.100"
          >
            <Badge colorPalette="blue">{ev.userId}</Badge>
            <Text fontWeight="bold">{ev.title}</Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(ev.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(ev.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default EventPopover;
