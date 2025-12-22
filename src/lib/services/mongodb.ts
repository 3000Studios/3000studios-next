export async function getDashboardStats() {
  return {
    users: 0,
    sessions: 0,
    revenue: 0,
    updatedAt: new Date().toISOString(),
  };
}

export async function getAnalytics(_timeRange?: string) {
  return {
    pageViews: [],
    events: [],
    sources: [],
  };
}

export async function getProducts() {
  return [];
}

export async function saveOrder(order: any) {
  return { insertedId: "mock-order", order };
}

export async function getOrders(_limit?: number) {
  return [];
}

export async function updateProduct(id: string, data: any) {
  return { id, ...data };
}
