import { User } from "firebase/auth";
import * as Api from "types/api";

async function parse(res: Response) {
  const { ok, headers, status } = res;
  const parsedResponse = headers
    .get("Content-Type")
    ?.includes("application/json")
    ? await res.json()
    : await res.text();
  if (ok) {
    return parsedResponse;
  } else {
    return Promise.reject({ status, ...parsedResponse });
  }
}

export async function get(url?: string) {
  const response = await fetch(url);
  return parse(response);
}

export async function post(url: string, data: Object) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parse(response);
}
