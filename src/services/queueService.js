import api from "./api";

export async function getQueues() {
  const response = await api.get("/queues");

  return response.data;
}

export async function getQueueById(queueId) {
  const response = await api.get(`/queues/${queueId}`);

  return response.data;
}

export async function createQueue(data) {
  const response = await api.post("/queues", data);

  return response.data;
}

export async function updateQueue(queueId, data) {
  const response = await api.put(`/queues/${queueId}`, data);

  return response.data;
}

export async function deleteQueue(queueId) {
  const response = await api.delete(`/queues/${queueId}`);

  return response.data;
}