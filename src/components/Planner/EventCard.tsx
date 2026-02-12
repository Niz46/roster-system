import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { format } from "date-fns";
import { User } from "../../types";

type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  userId?: string;
  user?: User | null;
  resourceId?: string;
  color?: "orange" | "green" | "purple" | "beige";
};

const palette = {
  orange: {
    bg: "event.orangeBg",
    border: "event.orangeBorder",
    text: "event.orangeText",
  },
  green: {
    bg: "event.greenBg",
    border: "event.greenBorder",
    text: "event.greenText",
  },
  purple: {
    bg: "event.purpleBg",
    border: "event.purpleBorder",
    text: "event.purpleText",
  },
  beige: {
    bg: "event.beigeBg",
    border: "event.beigeBorder",
    text: "neutral.text",
  },
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const colorKey = event.color ?? "beige";
  const p = palette[colorKey];

  // approximate height by time difference (optional visual only)
  const start = new Date(event.start);
  const end = new Date(event.end);
  const mins = Math.max(30, (end.getTime() - start.getTime()) / 60000);
  const height = `${Math.max(40, (mins / 30) * 60 - 8)}px`; // base cell 60

  return (
    <Box
      position="absolute"
      left="8px"
      right="8px"
      top="6px"
      h={height}
      borderRadius="10px"
      bg={p.bg}
      border="1px solid"
      borderColor={p.border}
      boxShadow="0 6px 18px rgba(20,33,62,0.04)"
      p={3}
      cursor="grab"
      overflow="hidden"
    >
      <Flex gap={3} align="flex-start">
        <Avatar
          size="xs"
          name={event.user?.name ?? event.title}
          src={event.user?.avatarUrl}
        />
        <Box flex="1" minW={0}>
          <Text fontSize="13px" fontWeight="700" color={p.text} lineClamp={1}>
            {event.title}
          </Text>
          <Text fontSize="12px" color={p.text} fontWeight="600">
            {format(start, "HH:mm")} - {format(end, "HH:mm")}
          </Text>
          {event.user?.name && (
            <Text fontSize="12px" color="brand.grayText" mt={1}>
              {event.user.name}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default EventCard;
