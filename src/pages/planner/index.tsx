import React, { useEffect } from "react";
import { Box, Container, Grid } from "@chakra-ui/react";
import {
  PlannerProvider,
  usePlannerContext,
} from "../../context/planner/planner.context";
import PlannerHeader from "../../components/Planner/PlannerHeader";
import CalendarGrid from "../../components/Planner/CalendarGrid";
import UsersList from "../../components/UsersPanel/UsersList";
import { fetchUsers } from "../../services/users.service";
import { fetchEvents } from "../../services/events.service";
import { initialPlannerState } from "../../context/planner/planner.reducer";
// import { uid } from '../../utils/uid';

const PlannerInner: React.FC = () => {
  const { state, dispatch } = usePlannerContext();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        dispatch({ type: "LOAD_STATE", payload: { loading: true } });
        const [users, events] = await Promise.all([
          fetchUsers(),
          fetchEvents(),
        ]);
        if (!mounted) return;
        // simplistic resource set for demo
        const resources = [
          { id: "r1", title: "Behandelingskamer1" },
          { id: "r2", title: "Management" },
          { id: "r3", title: "Bijzonderheden-Verlof" },
          { id: "r4", title: "Financien" },
        ];
        dispatch({
          type: "LOAD_STATE",
          payload: { users, events, resources, loading: false },
        });
      } catch (err) {
        console.error("Failed to load planner data", err);
        dispatch({ type: "LOAD_STATE", payload: { loading: false } });
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return (
    <Container maxW="full" px={6} py={6}>
      <Grid templateColumns="300px 1fr" gap={6}>
        <Box>
          <UsersList />
        </Box>
        <Box>
          <PlannerHeader />
          <CalendarGrid />
        </Box>
      </Grid>
    </Container>
  );
};

const PlannerPage: React.FC = () => (
  <PlannerProvider initial={initialPlannerState}>
    <PlannerInner />
  </PlannerProvider>
);

export default PlannerPage;
