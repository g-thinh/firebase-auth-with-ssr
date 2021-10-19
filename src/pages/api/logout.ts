import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    "session=deleted;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  res.status(302).end();
}
