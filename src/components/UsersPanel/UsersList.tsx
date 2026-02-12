import React from "react";
import {
  Box,
  Input,
  VStack,
  Heading,
  Flex,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { SearchNormal1, Filter } from "iconsax-reactjs";
import { usePlannerContext } from "../../context/planner/planner.context";
import UserChip from "./UserChip";

const UsersList: React.FC = () => {
  const { state } = usePlannerContext();

  return (
    <Box
      w="345px"
      h="calc(100vh - 120px)"
      borderRadius="16px"
      border="2px solid"
      borderColor="neutral.border"
      bg="white"
      p="24px"
      display="flex"
      flexDirection="column"
      gap="20px"
    >
      <Flex justify="space-between" align="center">
        <Heading fontSize="18px" fontWeight="bold">
          Roster
        </Heading>
        <Icon
          as={Filter}
          boxSize="20px"
          color="neutral.text"
          cursor="pointer"
        />
      </Flex>

      <InputGroup
        flex="1"
        startElement={<SearchNormal1 size="20" color="#94A3B8" />}
      >
        <Input
          placeholder="Search"
          h="44px"
          borderRadius="8px"
          borderColor="neutral.outline"
          _focus={{ borderColor: "brand.blue", boxShadow: "none" }}
          fontSize="14px"
        />
      </InputGroup>

      <Flex gap="12px">
        <Badge px={3} py={1} borderRadius="full" bg="brand.blue" color="white">
          All {state.users.length}
        </Badge>
      </Flex>

      <VStack
        align="stretch"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": {
            bg: "gray.200",
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
