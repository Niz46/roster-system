import { useCallback } from "react";

export default function useDateNavigator(
  dateIso: string,
  onChange: (d: string) => void,
) {
  const next = useCallback(() => {
    const d = new Date(dateIso);
    d.setDate(d.getDate() + 1);
    onChange(d.toISOString().slice(0, 10));
  }, [dateIso, onChange]);

  const prev = useCallback(() => {
    const d = new Date(dateIso);
    d.setDate(d.getDate() - 1);
    onChange(d.toISOString().slice(0, 10));
  }, [dateIso, onChange]);

  const today = useCallback(() => {
    const d = new Date();
    onChange(d.toISOString().slice(0, 10));
  }, [onChange]);

  const formatted = new Date(dateIso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    date: dateIso,
    setDate: onChange,
    next,
    prev,
    today,
    formatted,
  };
}
