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
      mx="30px"
      borderTop="1px solid"
      borderLeft="1px solid"
      borderColor="neutral.main"
      h="600px"
      overflowY="auto"
      bg="white"
    >
      <Grid
        templateColumns={`80px repeat(${state.resources.length}, ${resourceColWidth})`}
        position="sticky"
        top={0}
        zIndex={10}
        bg="neutral.surface"
        borderBottom="1px solid"
        borderColor="neutral.main"
      >
        <GridItem borderRight="1px solid" borderColor="neutral.main" h="44px" />{" "}
        {state.resources.map((res) => (
          <GridItem
            key={res.id}
            h="44px"
            display="flex"
            alignItems="center"
            px={3}
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
            templateColumns={`80px repeat(${state.resources.length}, ${resourceColWidth})`}
            borderBottom="1px solid"
            borderColor="neutral.main"
          >
            <GridItem
              borderRight="1px solid"
              borderColor="neutral.main"
              py={2}
              px={3}
              bg="white"
            >
              <Text fontSize="12px" color="gray.500" fontWeight="medium">
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
