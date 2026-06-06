import { Request, Response } from "express";

import { getDashboardData } from "../services/analytics/dashboard.service";

export const dashboard = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  const data = await getDashboardData(userId);

  res.json(data);
};
