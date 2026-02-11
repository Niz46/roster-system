/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";


let events: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(events);
  } else if (req.method === "POST") {
    const payload = req.body;
    events.push(payload);
    res.status(201).json(payload);
  } else if (req.method === "PUT") {
    const updated = req.body;
    events = events.map((e) => (e.id === updated.id ? updated : e));
    res.status(200).json(updated);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    events = events.filter((e) => e.id !== id);
    res.status(200).json({ id });
  } else {
    res.status(405).end();
  }
}
