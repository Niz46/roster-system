// PlannerHeader.tsx
import React from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { ArrowDown2, Add, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { usePlannerContext } from "../../context/planner/planner.context";
import useDateNavigator from "../../hooks/useDateNavigator";

const PlannerHeader: React.FC = () => {
  const { state, dispatch } = usePlannerContext();
  const { next, prev, } = useDateNavigator(state.date, (d) =>
    dispatch({ type: "SET_DATE", payload: d }),
  );
  const isLive = state.view === "live";

  const dateObj = new Date(state.date);
  const weekday = dateObj.toLocaleString(undefined, { weekday: "short" });
  const dayNum = dateObj.getDate();
  const monthYear = dateObj.toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      bg="white"
      borderBottom="1px solid"
      borderColor="neutral.outline"
      fontFamily="var(--font-manrope)"
    >
      {/* Top row */}
      <Flex
        h="70px"
        align="center"
        justify="space-between"
        px={{ base: 4, md: 8, lg: 10 }}
      >
        <Text fontSize="24px" fontWeight={700}>
          Planner
        </Text>

        <HStack spacing={3}>
          <Button
            variant="ghost"
            bg="white"
            border="1px solid"
            borderColor="neutral.outline"
            h="38px"
            px="16px"
            fontWeight={500}
            gap="2"
          >
            Open Days
            <ArrowDown2 size="14" />
          </Button>

          {/* Nieuw menu using Chakra Menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              h="38px"
              px="12px"
              display="inline-flex"
              alignItems="center"
              gap={2}
              borderColor="neutral.outline"
            >
              <Add size="14" style={{ marginLeft: 2 }} />
              <Text as="span" fontWeight={600} fontSize="14px">
                Nieuw
              </Text>
              <ArrowDown2 size="14" />
            </MenuButton>

            <MenuList minW="160px" borderRadius="8px" boxShadow="sm" p={1}>
              <MenuItem onClick={() => dispatch({ type: "CREATE_SHIFT" })}>
                Create shift
              </MenuItem>
              <MenuItem onClick={() => dispatch({ type: "IMPORT" })}>
                Import
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Live ribbon */}
      <Flex px={{ base: 4, md: 8, lg: 10 }} pb={4} pt={0}>
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          gap={4}
          borderRadius="16px"
          border="1px solid"
          borderColor={isLive ? "brand.redBorder" : "neutral.outline"}
          bg={isLive ? "brand.redLight" : "transparent"}
          py={3}
          px={4}
        >
          <Badge
            bg={isLive ? "brand.red" : "brand.grayLight"}
            color={isLive ? "white" : "brand.grayText"}
            borderRadius="full"
            px={3}
            py={1}
            fontWeight={700}
            fontSize="12px"
          >
            Live
          </Badge>

          <Text fontSize="14px" color={isLive ? "brand.red" : "brand.grayText"}>
            {isLive ? "Live Planner" : "Planner"} —{" "}
            {isLive ? "Description of the live" : "Description of the planner"}
          </Text>
        </Box>
      </Flex>

      {/* Controls */}
      <Flex direction="column" px={{ base: 4, md: 8, lg: 10 }} py={5} gap={5}>
        <Flex align="center" gap={4} justify="space-between">
          <Flex align="center" gap={6}>
            <Box
              px="10px"
              py="6px"
              borderRadius="16px"
              display="flex"
              alignItems="center"
              gap={3}
              border="1px solid"
              borderColor={isLive ? "brand.redBorder" : "neutral.outline"}
              bg={isLive ? "brand.redLight" : "transparent"}
            >
              <Button
                size="sm"
                borderRadius="full"
                px="18px"
                h="34px"
                fontSize="12px"
                fontWeight={700}
                onClick={() => dispatch({ type: "SET_VIEW", payload: "live" })}
                bg={isLive ? "brand.red" : "transparent"}
                color={isLive ? "white" : "brand.grayText"}
                _hover={{ bg: isLive ? "brand.red" : "rgba(255,56,60,0.06)" }}
                boxShadow={isLive ? "sm" : undefined}
              >
                Live
              </Button>

              <Button
                size="sm"
                borderRadius="full"
                px="18px"
                h="34px"
                fontSize="12px"
                fontWeight={700}
                onClick={() =>
                  dispatch({ type: "SET_VIEW", payload: "planner" })
                }
                bg={!isLive ? "brand.blue" : "transparent"}
                color={!isLive ? "white" : "brand.grayText"}
                _hover={{
                  bg: !isLive ? "brand.blue" : "rgba(86,83,252,0.06)",
                }}
              >
                Planner
              </Button>
            </Box>

            <Text fontSize="13px" color="brand.grayText">
              {isLive
                ? "Showing real-time roster updates."
                : "Planning mode: drafts are visible and editable."}
            </Text>
          </Flex>

          <HStack spacing={3} align="center">
            {/* Date navigator box */}
            <Box
              bg="white"
              border="1px solid"
              borderColor="neutral.outline"
              borderRadius="8px"
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              gap={3}
              minW="320px"
              boxShadow="sm"
            >
              <IconButton
                aria-label="Previous"
                onClick={prev}
                icon={<ArrowLeft2 size={18} />}
                size="sm"
                variant="ghost"
                _hover={{ bg: "gray.50" }}
              />

              <Box display="flex" flexDirection="column" alignItems="flex-start" flex={1}>
                <HStack spacing={3}>
                  <Box
                    px="10px"
                    py="6px"
                    borderRadius="10px"
                    border="1px solid"
                    borderColor="neutral.outline"
                    bg="white"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    minW="72px"
                    justifyContent="center"
                  >
                    <Text fontSize="12px" fontWeight={700} color="brand.grayText">
                      {weekday}
                    </Text>
                    <Text fontSize="14px" fontWeight={800}>
                      {dayNum}
                    </Text>
                  </Box>

                  <Text fontWeight={700} fontSize="15px" textTransform="capitalize">
                    {monthYear}
                  </Text>
                </HStack>
              </Box>

              <IconButton
                aria-label="Next"
                onClick={next}
                icon={<ArrowRight2 size={18} />}
                size="sm"
                variant="ghost"
                _hover={{ bg: "gray.50" }}
              />
            </Box>

            {/* This day menu */}
            <Menu>
              <MenuButton
                as={Button}
                h="38px"
                px="14px"
                bg="white"
                border="1px solid"
                borderColor="neutral.outline"
                gap="2"
                rightIcon={<ArrowDown2 size="14" />}
              >
                <Box
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg="#0CA740"
                  mr="8px"
                  display="inline-block"
                />
                This day
              </MenuButton>

              <MenuList>
                <MenuItem onClick={() => dispatch({ type: "SET_SCOPE", payload: "day" })}>
                  Deze dag
                </MenuItem>
                <MenuItem onClick={() => dispatch({ type: "SET_SCOPE", payload: "week" })}>
                  Deze week
                </MenuItem>
                <MenuItem onClick={() => dispatch({ type: "SET_SCOPE", payload: "month" })}>
                  Maand
                </MenuItem>
              </MenuList>
            </Menu>

            <Button variant="outline" h="38px" px="14px" borderColor="neutral.outline">
              Publish All
            </Button>
            <Button variant="outline" h="38px" px="14px" borderColor="neutral.outline">
              Lock Shift
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PlannerHeader;
