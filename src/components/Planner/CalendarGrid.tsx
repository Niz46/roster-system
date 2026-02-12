import React, { useMemo } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { usePlannerContext } from "../../context/planner/planner.context";
import { generateTimeSlots } from "../../utils/time";
import TimeCell from "./TimeCell";
import EventCard from "./EventCard";

const CalendarGrid: React.FC = () => {
  const { state } = usePlannerContext();
  const slots = useMemo(() => generateTimeSlots("08:00", "20:00", 30), []);

  const resourceColWidth = "1fr";

  return (
    <Box
      mt="20px"
      mx={{ base: 2, md: 6, lg: 10 }}
      borderTop="1px solid"
      borderLeft="1px solid"
      borderColor="neutral.main"
      h="600px"
      overflowY="auto"
      bg="white"
      borderRadius="12px"
    >
      <Grid
        templateColumns={`100px repeat(${state.resources.length}, ${resourceColWidth})`}
        position="sticky"
        top={0}
        zIndex={12}
        bg="neutral.surface"
        borderBottom="1px solid"
        borderColor="neutral.main"
      >
        <GridItem borderRight="1px solid" borderColor="neutral.main" h="48px" />
        {state.resources.map((res) => (
          <GridItem
            key={res.id}
            h="48px"
            display="flex"
            alignItems="center"
            px={4}
            borderRight="1px solid"
            borderColor="neutral.main"
            bg="neutral.surface"
          >
            <Text fontSize="14px" fontWeight="600" color="gray.700">
              {res.title}
            </Text>
          </GridItem>
        ))}
      </Grid>

      <Box position="relative">
        {slots.map((slot) => (
          <Grid
            key={slot}
            templateColumns={`100px repeat(${state.resources.length}, ${resourceColWidth})`}
            borderBottom="1px solid"
            borderColor="neutral.main"
          >
            <GridItem
              borderRight="1px solid"
              borderColor="neutral.main"
              py={3}
              px={4}
              bg="white"
            >
              <Text fontSize="12px" color="gray.500" fontWeight="500">
                {slot}
              </Text>
            </GridItem>

            {state.resources.map((res) => (
              <GridItem
                key={`${res.id}-${slot}`}
                borderRight="1px solid"
                borderColor="neutral.main"
                position="relative"
                minH="60px"
                px={3}
                py={2}
                bg="white"
              >
                <TimeCell
                  time={slot}
                  resourceId={res.id}
                  cellHeightPx={60}
                  slotStepMins={30}
                />

                {state.events
                  .filter((ev) => ev.resourceId === res.id)
                  .filter((ev) => {
                    return (
                      new Date(ev.start).toTimeString().slice(0, 5) === slot
                    );
                  })
                  .map((ev) => (
                    <EventCard key={ev.id} event={ev} />
                  ))}
              </GridItem>
            ))}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default CalendarGrid;
