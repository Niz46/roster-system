import { Box, Container } from "@chakra-ui/react";
import { PlannerProvider } from "../../context/planner/planner.context";
import PlannerHeader from "../../components/Planner/PlannerHeader";
import CalendarGrid from "../../components/Planner/CalendarGrid";
import UsersList from "../../components/UsersPanel/UsersList";

const PlannerPage: React.FC = () => {
  return (
    <PlannerProvider >
      <Container maxW="full" p={6}>
        <Box display="flex" gap={6}>
          <Box w="300px">
            <UsersList />
          </Box>
          <Box flex="1">
            <PlannerHeader />
            <CalendarGrid />
          </Box>
        </Box>
      </Container>
    </PlannerProvider>
  );
};

export default PlannerPage;
