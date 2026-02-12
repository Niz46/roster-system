import React from "react";
import { Box, Text } from "@chakra-ui/react";

const EmptyState: React.FC<{ title?: string; subtitle?: string }> = ({
  title = "Nothing here",
  subtitle,
}) => {
  return (
    <Box textAlign="center" py={8} color="gray.500">
      <Text fontWeight="bold">{title}</Text>
      {subtitle && <Text mt={2}>{subtitle}</Text>}
    </Box>
  );
};

export default EmptyState;
