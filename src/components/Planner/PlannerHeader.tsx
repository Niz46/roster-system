import React from "react";
import { Box, HStack, Button, Text, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { usePlannerContext } from "../../context/planner/planner.context";
import useDateNavigator from "../../hooks/useDateNavigator";
import { NativeSelect } from "@chakra-ui/react";

const PlannerHeader: React.FC = () => {
  const { state, dispatch } = usePlannerContext();

  const { date, next, prev, formatted } = useDateNavigator(state.date, (d) =>
    dispatch({ type: "SET_DATE", payload: d }),
  );

  return (
    <Box mb={4}>
      <HStack justify="space-between" align="center">
        <HStack gap={3}>
          <Button
            variant={state.view === "live" ? "solid" : "ghost"}
            colorPalette="red"
            onClick={() => dispatch({ type: "SET_VIEW", payload: "live" })}
          >
            Live
          </Button>
          <Button
            variant={state.view === "planner" ? "solid" : "ghost"}
            onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })}
          >
            Planner
          </Button>
          <Text color="gray.500">Description of the {state.view} view</Text>
        </HStack>

        <HStack gap={2}>
          <IconButton aria-label="previous" onClick={prev}>
            <ChevronLeftIcon />
          </IconButton>

          <Button onClick={() => dispatch({ type: "SET_DATE", payload: date })}>
            {formatted}
          </Button>

          <IconButton aria-label="next" onClick={next}>
            <ChevronRightIcon />
          </IconButton>

          <NativeSelect.Root width="160px">
            <NativeSelect.Field>
              <option value="day">Deze dag</option>
              <option value="week">Deze week</option>
              <option value="month">Maand</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>

          <Button onClick={() => {}}>Publish All</Button>
          <Button onClick={() => {}}>Lock Shift</Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default PlannerHeader;
