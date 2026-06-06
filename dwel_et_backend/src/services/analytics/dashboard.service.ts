import prisma from "../../config/database";

export const getDashboardData = async (userId: string) => {
  const events = await prisma.contentEvent.findMany({
    where: { userId },
  });

  const totalScore = events.reduce(
    (sum: any, e: any) => sum + e.wellbeingScore,
    0,
  );

  const wellbeingScore = events.length ? totalScore / events.length : 0;

  return {
    wellbeingScore,
    totalEvents: events.length,
  };
};
