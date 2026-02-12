import React, { useMemo } from "react";
import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { usePlannerContext } from "../../context/planner/planner.context";
import { generateTimeSlots } from "../../utils/time";
import TimeCell from "./TimeCell";
import EventCard from "./EventCard";

const CalendarGrid: React.FC = () => {
  const { state } = usePlannerContext();
  const slots = useMemo(() => generateTimeSlots("08:00", "20:00", 30), []);

  return (
    <Box bg="white" borderRadius="md" p={4} boxShadow="sm">
      <Grid
        templateColumns={`100px repeat(${state.resources.length}, 1fr)`}
        gap={2}
        alignItems="start"
      >
        <GridItem>
          <Box py={2} px={2} />
        </GridItem>

        {state.resources.map((res) => (
          <GridItem key={res.id} py={2} px={2}>
            <Text fontWeight="semibold">{res.title}</Text>
          </GridItem>
        ))}

        {slots.map((slot) => (
          <React.Fragment key={slot}>
            <GridItem borderTop="1px" borderColor="gray.100" py={3}>
              <Text fontSize="sm" color="gray.500">
                {slot}
              </Text>
            </GridItem>

            {state.resources.map((res) => (
              <GridItem
                key={`${res.id}-${slot}`}
                borderTop="1px"
                borderColor="gray.100"
                minH="60px"
                px={2}
                position="relative"
              >
                <TimeCell
                  time={slot}
                  resourceId={res.id}
                  cellHeightPx={60}
                  slotStepMins={30}
                />
                {state.events
                  .filter((ev) => ev.resourceId === res.id)
                  .filter(
                    (ev) =>
                      new Date(ev.start).toTimeString().slice(0, 5) === slot,
                  )
                  .map((ev) => (
                    <EventCard key={ev.id} event={ev} />
                  ))}
              </GridItem>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default CalendarGrid;
