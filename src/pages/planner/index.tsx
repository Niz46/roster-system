import React, { ReactElement, useEffect } from "react";
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
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { NextPageWithLayout } from "@/src/types";

const PlannerInner: React.FC = () => {
  const { dispatch } = usePlannerContext();

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
    <Container maxW="full" px={{ base: 4, md: 6 }} py={6}>
      <Grid
        templateColumns={{ base: "1fr", lg: "300px 1fr" }}
        gap={6}
        alignItems="start"
      >
        <Box>
          <UsersList />
        </Box>

        <Box as="main" minW={0}>
          <PlannerHeader />
          <CalendarGrid />
        </Box>
      </Grid>
    </Container>
  );
};

const PlannerPage: NextPageWithLayout = () => (
  <PlannerProvider initial={initialPlannerState}>
    <PlannerInner />
  </PlannerProvider>
);

PlannerPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default PlannerPage;
