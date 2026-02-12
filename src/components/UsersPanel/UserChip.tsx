import React from "react";
import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { User } from "../../types";

const UserChip: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Box
      w="100%"
      minH="87px"
      borderRadius="12px"
      border="1px solid"
      borderColor="neutral.outline"
      p="10px"
      bg="white"
      cursor="grab"
      transition="all 0.2s"
      _hover={{ boxShadow: "sm", borderColor: "brand.blue" }}
    >
      <Flex justify="space-between" align="start">
        <Flex gap="8px">
          <Avatar size="sm" name={user.name} src={user.avatarUrl} />
          <Box>
            <Text fontSize="14px" fontWeight="700" color="#242424">
              {user.name}
            </Text>
            <Badge mt="1" variant="subtle" size="sm" fontSize="10px">
              1158 hrs
            </Badge>
          </Box>
        </Flex>

        <Badge
          bg="brand.redLight"
          color="brand.red"
          borderRadius="md"
          fontSize="10px"
          px={2}
        >
          {user.status === "on_leave" ? "On leave" : "Available"}
        </Badge>
      </Flex>

      <Flex mt={2} justify="space-between" align="center">
        <Text fontSize="10px" color="brand.grayText">
          Jan 12 - Jan 28
        </Text>
        <Flex gap="4px">
          {["m", "d", "w", "d", "v"].map((d, i) => (
            <Text
              key={i}
              fontSize="10px"
              color={i > 2 ? "brand.red" : "#0CA740"}
              fontWeight="800"
              textTransform="uppercase"
            >
              {d}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserChip;
