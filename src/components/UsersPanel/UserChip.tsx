import React from "react";
import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { User } from "../../types";

const UserChip: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Box
      w="100%"
      minH="90px"
      borderRadius="12px"
      border="1px solid"
      borderColor="neutral.outline"
      p="12px"
      bg="white"
      cursor="grab"
      transition="all 0.12s"
      _hover={{ boxShadow: "soft", borderColor: "brand.blue" }}
    >
      <Flex justify="space-between" align="start">
        <Flex gap="10px" align="center">
          <Avatar size="sm" name={user.name} src={user.avatarUrl} />
          <Box>
            <Text fontSize="14px" fontWeight="700" color="#242424">
              {user.name}
            </Text>
            <Badge
              mt="4px"
              variant="subtle"
              fontSize="11px"
              color="brand.grayText"
              borderRadius="8px"
            >
              1158 hrs
            </Badge>
          </Box>
        </Flex>

        <Badge
          bg={user.status === "on_leave" ? "brand.redLight" : "#ECFDF3"}
          color={user.status === "on_leave" ? "brand.red" : "#0CA740"}
          borderRadius="md"
          fontSize="10px"
          px={2}
          py={1}
        >
          {user.status === "on_leave" ? "On leave" : "Available"}
        </Badge>
      </Flex>

      <Flex mt={3} justify="space-between" align="center">
        <Text fontSize="11px" color="brand.grayText">
          Jan 12 - Jan 28
        </Text>
        <Flex gap="6px">
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
