import type { APIResponse } from "@/types/api";

async function sendRequest<PayloadType, ResponseType>({
  payload,
  method,
  path,
}: {
  payload: PayloadType;
  method: string;
  path: string;
}): Promise<APIResponse<ResponseType>> {
  const request = await fetch(path, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const response: APIResponse<ResponseType> = await request.json();
  return response;
}

export default sendRequest;
