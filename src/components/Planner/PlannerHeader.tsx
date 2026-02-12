import React from "react";
import { Box, Flex, Button, Text, HStack } from "@chakra-ui/react";
import { ArrowDown2, Add, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { usePlannerContext } from "../../context/planner/planner.context";
import useDateNavigator from "../../hooks/useDateNavigator";

const PlannerHeader: React.FC = () => {
  const { state, dispatch } = usePlannerContext();
  const { next, prev, formatted } = useDateNavigator(state.date, (d) =>
    dispatch({ type: "SET_DATE", payload: d }),
  );

  const isLive = state.view === "live";

  return (
    <Box bg="white">
      <Flex
        h="70px"
        align="center"
        justify="space-between"
        px="30px"
        borderBottom="1px solid"
        borderColor="neutral.outline"
      >
        <Text fontSize="24px" fontWeight="700" fontFamily="var(--font-manrope)">
          Planner
        </Text>

        <HStack gap="8px">
          <Button
            variant="outline"
            borderColor="neutral.outline"
            color="neutral.text"
            h="38px"
            px="16px"
            fontWeight="500"
          >
            Open Days
            <ArrowDown2 size="16" style={{ marginLeft: "8px" }} />
          </Button>

          <Button
            variant="outline"
            borderColor="neutral.outline"
            color="neutral.text"
            h="38px"
            px="16px"
            fontWeight="500"
          >
            <Add size="16" style={{ marginRight: "8px" }} />
            Nieuw
            <ArrowDown2 size="16" style={{ marginLeft: "8px" }} />
          </Button>
        </HStack>
      </Flex>

      <Flex direction="column" px="30px" pt="24px" gap="20px">
        <Flex align="center" gap="16px">
          <Flex
            bg="brand.redLight"
            p="4px"
            borderRadius="full"
            border="1px solid"
            borderColor="brand.redBorder"
            align="center"
          >
            <Button
              size="sm"
              h="32px"
              borderRadius="full"
              px="20px"
              fontSize="12px"
              fontWeight="600"
              bg={isLive ? "brand.red" : "transparent"}
              color={isLive ? "white" : "brand.grayText"}
              _hover={{ bg: isLive ? "brand.red" : "rgba(255, 56, 60, 0.1)" }}
              onClick={() => dispatch({ type: "SET_VIEW", payload: "live" })}
            >
              Live
            </Button>
            <Button
              size="sm"
              h="32px"
              borderRadius="full"
              px="20px"
              fontSize="12px"
              fontWeight="600"
              bg={!isLive ? "brand.red" : "transparent"}
              color={!isLive ? "white" : "brand.grayText"}
              _hover={{ bg: !isLive ? "brand.red" : "rgba(255, 56, 60, 0.1)" }}
              onClick={() => dispatch({ type: "SET_VIEW", payload: "planner" })}
            >
              Planner
            </Button>
          </Flex>

          <Text fontSize="13px" color="brand.grayText" fontWeight="400">
            {isLive
              ? "Showing real-time roster updates."
              : "Planning mode: drafts are visible and editable."}
          </Text>
        </Flex>

        <Flex justify="space-between" align="center" w="100%" pb="20px">
          <HStack gap="12px">
            <Flex
              align="center"
              bg="white"
              border="1px solid"
              borderColor="neutral.outline"
              borderRadius="8px"
              p="1"
              gap="2"
            >
              <Box
                as="button"
                onClick={prev}
                p="1"
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
              >
                <ArrowLeft2 size="20" />
              </Box>

              <Text
                fontWeight="700"
                fontSize="15px"
                minW="140px"
                textAlign="center"
              >
                {formatted}
              </Text>

              <Box
                as="button"
                onClick={next}
                p="1"
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
              >
                <ArrowRight2 size="20" />
              </Box>
            </Flex>
          </HStack>

          <HStack gap="8px">
            <Button
              bg="white"
              border="1px solid"
              borderColor="neutral.outline"
              color="#0CA740"
              h="38px"
              fontSize="14px"
              px="16px"
            >
              <Box w="8px" h="8px" borderRadius="full" bg="#0CA740" mr="8px" />
              This day
              <ArrowDown2 size="14" style={{ marginLeft: "8px" }} />
            </Button>

            <Button
              variant="outline"
              borderColor="neutral.outline"
              h="38px"
              fontSize="14px"
              color="neutral.text"
            >
              Publish All
            </Button>

            <Button
              variant="outline"
              borderColor="neutral.outline"
              h="38px"
              fontSize="14px"
              color="neutral.text"
            >
              Lock Shift
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PlannerHeader;
