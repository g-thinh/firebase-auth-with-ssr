import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "services/firebaseAdmin";
import type { Session } from "types/api";

export default async function createUserSession(
  req: NextApiRequest,
  res: NextApiResponse<Session>
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
            res.status(200).json({
              success: true,
              message: "User has been verified",
            });
          });
      }
    }

    default: {
      res.setHeader("Allow", ["POST"]);
      res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
      return;
    }
  }
}
