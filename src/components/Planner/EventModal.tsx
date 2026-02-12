import React, { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  Field,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import { usePlannerContext } from "../../context/planner/planner.context";
import { uid } from "../../utils/uid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialEventId?: string | null;
}

const EventModal: React.FC<Props> = ({ isOpen, onClose, initialEventId }) => {
  const { state, dispatch } = usePlannerContext();
  const existing = state.events.find((e) => e.id === initialEventId);

  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(existing?.title ?? "");
      setUserId(existing?.userId ?? state.users[0]?.id ?? "");
      setResourceId(existing?.resourceId ?? state.resources[0]?.id ?? "");
      setStart(existing?.start.slice(0, 16) ?? `${state.date}T09:00`);
      setEnd(existing?.end.slice(0, 16) ?? `${state.date}T10:00`);
    }
  }, [isOpen, existing, state.date, state.users, state.resources]);

  const handleSave = () => {
    const event = {
      id: existing?.id ?? uid("ev_"),
      title,
      userId,
      resourceId,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      status: existing?.status ?? ("draft" as const),
    };

    dispatch({
      type: existing ? "UPDATE_EVENT" : "ADD_EVENT",
      payload: event,
    });
    onClose();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => !details.open && onClose()}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{existing ? "Edit Event" : "Add Event"}</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body>
          <Stack gap={4}>
            <Field.Root>
              <Field.Label>Title</Field.Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field.Root>

            <Field.Root>
              <Field.Label>User</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                >
                  {state.users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label>Start</Field.Label>
              <Input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>End</Field.Label>
              <Input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Field.Root>
          </Stack>
        </Dialog.Body>

        <Dialog.Footer>
          {existing && (
            <Button
              colorPalette="red"
              variant="ghost"
              mr="auto"
              onClick={() => {
                dispatch({
                  type: "DELETE_EVENT",
                  payload: { id: existing.id },
                });
                onClose();
              }}
            >
              Delete
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button colorPalette="blue" onClick={handleSave}>
            Save
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EventModal;
