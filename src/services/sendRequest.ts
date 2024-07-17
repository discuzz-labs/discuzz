import { APIResponse } from "@/types/api";

async function sendrequest<P, T>({
  payload,
  method,
  path,
}: {
  payload: P;
  method: string;
  path: string;
}): Promise<APIResponse<T>> {
  const request = await fetch(path, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const response: APIResponse<T> = await request.json();
  return response;
}

export default sendrequest;
