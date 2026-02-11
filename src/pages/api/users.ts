import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../context/planner/planner.types";

const usersStore: User[] = [
  { id: "u1", name: "Haico de Gast", initials: "HG", status: "available" },
  { id: "u2", name: "Diane Lane", initials: "DL", status: "available" },
  { id: "u3", name: "Elijah Oyin", initials: "EO", status: "on_leave" },
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(usersStore);
  } catch (err) {
    console.error("users api error", err);
    res.status(500).json({ error: "internal server error" });
  }
}
