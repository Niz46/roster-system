import React from "react";
import { Box, Input, VStack, Heading, Flex, Icon, Badge, HStack } from "@chakra-ui/react";
import { Filter } from "iconsax-reactjs";
import { usePlannerContext } from "../../context/planner/planner.context";
import UserChip from "./UserChip";

const UsersList: React.FC = () => {
  const { state } = usePlannerContext();

  return (
    <Box
      w={{ base: "100%", lg: "345px" }}
      h="calc(100vh - 140px)"
      borderRadius="16px"
      border="1px solid"
      borderColor="neutral.outline"
      bg="white"
      p="20px"
      display="flex"
      flexDirection="column"
      gap="16px"
    >
      <Flex justify="space-between" align="center">
        <Heading fontSize="18px" fontWeight="700">
          Roster
        </Heading>
        <Icon as={Filter} boxSize="20px" color="neutral.text" cursor="pointer" />
      </Flex>

      <Box>
        <Input
          placeholder="Search"
          h="44px"
          borderRadius="10px"
          borderColor="neutral.outline"
          _focus={{ borderColor: "brand.blue", boxShadow: "none" }}
          fontSize="14px"
          pl="40px"
        />
      </Box>

      <HStack spacing={3}>
        <Badge px={3} py={1} borderRadius="full" bg="brand.blue" color="white">
          All {state.users.length}
        </Badge>
        <Badge px={3} py={1} borderRadius="full" bg="gray.50" color="neutral.text">
          Available {state.users.filter(u => u.status !== "on_leave").length}
        </Badge>
        <Badge px={3} py={1} borderRadius="full" bg="white" border="1px solid" borderColor="neutral.outline">
          On Leave {state.users.filter(u => u.status === "on_leave").length}
        </Badge>
      </HStack>

      <VStack
        align="stretch"
        overflowY="auto"
        spacing={3}
        pt={2}
        css={{
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            background: "#E6EEF8",
            borderRadius: "24px",
          },
        }}
      >
        {state.users.map((u) => (
          <UserChip key={u.id} user={u} />
        ))}
      </VStack>
    </Box>
  );
};

export default UsersList;
