import React from "react";
import { Box, Flex, Avatar, Text, Badge } from "@chakra-ui/react";
import { User } from "../../context/planner/planner.types";

const statusColor = (status: User["status"]) => {
  switch (status) {
    case "available":
      return "green";
    case "on_leave":
      return "orange";
    default:
      return "gray";
  }
};

const UserChip: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Flex align="center" gap={3} p={2} bg="gray.50" borderRadius="md">
      <Avatar.Root size="sm">
        <Avatar.Fallback name={user.name} />
        <Avatar.Image />
      </Avatar.Root>

      <Box flex="1">
        <Text fontSize="sm" fontWeight="medium">
          {user.name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {user.id}
        </Text>
      </Box>

      <Badge colorPalette={statusColor(user.status)} variant="subtle">
        {user.status.replace("_", " ")}
      </Badge>
    </Flex>
  );
};

export default UserChip;
