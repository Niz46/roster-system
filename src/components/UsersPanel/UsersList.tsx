import React from "react";
import { Box, Input, VStack, Heading, Text, Spinner } from "@chakra-ui/react";
import UserChip from "./UserChip";
import { usePlannerContext } from "../../context/planner/planner.context";

const UsersList: React.FC = () => {
  const { state } = usePlannerContext();

  if (state.loading) {
    return (
      <Box p={4}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box bg="white" borderRadius="md" p={4} boxShadow="sm">
      <Heading size="sm" mb={3}>
        Roster
      </Heading>
      <Input placeholder="Search..." mb={3} />
      <VStack gap={3} align="stretch">
        <Box>
          <Text fontSize="sm" color="gray.500">
            All ({state.users.length})
          </Text>
        </Box>
        {state.users.map((u) => (
          <UserChip key={u.id} user={u} />
        ))}
        {state.users.length === 0 && <Text color="gray.500">No users</Text>}
      </VStack>
    </Box>
  );
};

export default UsersList;
