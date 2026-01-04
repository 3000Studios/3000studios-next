import { prisma } from "./prisma";

export async function pruneMemory() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  try {
    const result = await prisma.aIMemory.deleteMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
        },
        accessCount: {
          lt: 2,
        },
      },
    });
    console.log(`Pruned ${result.count} memories.`);
  } catch (error: unknown) {
    console.error("Failed to prune memory:", error);
  }
}
