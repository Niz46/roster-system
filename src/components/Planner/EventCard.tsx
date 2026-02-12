import React from "react";
import { Box, Text, Flex, Badge } from "@chakra-ui/react";
import { Event } from "../../types";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const isSurgery = event.title.includes("Surgery");
  const isSpecialist = event.title.includes("Pijnspecialist");

  const colors = isSurgery
    ? {
        bg: "event.orangeBg",
        border: "event.orangeBorder",
        text: "event.orangeText",
      }
    : isSpecialist
      ? {
          bg: "event.greenBg",
          border: "event.greenBorder",
          text: "event.greenText",
        }
      : {
          bg: "event.purpleBg",
          border: "event.purpleBorder",
          text: "event.purpleText",
        };

  return (
    <Box
      position="absolute"
      inset="2px"
      bg={colors.bg}
      borderLeft="4px solid"
      borderColor={colors.border}
      borderRadius="4px"
      p="8px"
      zIndex={2}
      boxShadow="0px 2px 4px rgba(0,0,0,0.05)"
    >
      <Flex direction="column" gap="1">
        <Badge
          bg="white"
          color={colors.text}
          variant="outline"
          size="sm"
          fontSize="9px"
          w="fit-content"
        >
          HG
        </Badge>
        <Text fontSize="12px" fontWeight="700" color="#242424" lineClamp={1}>
          {event.title}
        </Text>
        <Text fontSize="10px" color="gray.500" fontWeight="500">
          {new Date(event.start).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}{" "}
          -
          {new Date(event.end).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
      </Flex>
    </Box>
  );
};

export default EventCard;
