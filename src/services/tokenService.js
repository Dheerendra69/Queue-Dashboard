import api from "./api";

export async function getTokens(queueId) {
  const response = await api.get(`/tokens/queue/${queueId}`);

  return response.data;
}

export async function addToken(queueId, data) {
  const response = await api.post(
    `/tokens/${queueId}`,
    data
  );

  return response.data;
}

export async function moveTokenUp(tokenId) {
  const response = await api.patch(
    `/tokens/${tokenId}/up`
  );

  return response.data;
}

export async function moveTokenDown(tokenId) {
  const response = await api.patch(
    `/tokens/${tokenId}/down`
  );

  return response.data;
}

export async function serveToken(tokenId) {
  const response = await api.patch(
    `/tokens/${tokenId}/serve`
  );

  return response.data;
}

export async function cancelToken(tokenId) {
  const response = await api.patch(
    `/tokens/${tokenId}/cancel`
  );

  return response.data;
}