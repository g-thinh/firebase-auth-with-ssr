import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "services/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in ms

  switch (method) {
    case "POST": {
      const { token } = req.headers;

      const verifiedToken = await adminAuth.verifyIdToken(token as string);

      if (verifiedToken) {
        return adminAuth
          .createSessionCookie(token as string, { expiresIn })
          .then((sessionCookie) => {
            // Set cookie policy for session cookie.
            res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
            res.setHeader(
              "Set-Cookie",
              `session=${sessionCookie};Path=/;HttpOnly;Max-Age=${expiresIn};`
            );
            res.status(200).json({});
          });
      }
    }

    default: {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
      return;
    }
  }
}
