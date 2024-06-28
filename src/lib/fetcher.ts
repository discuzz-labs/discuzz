function fetcher<T>(
  endpoint: string,
  payload: T,
  method: "POST" | "GET" | "PUT" | "DELETE"
) {
  return fetch(endpoint, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

export default fetcher;
