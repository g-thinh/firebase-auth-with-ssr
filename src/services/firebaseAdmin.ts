import {
  AppOptions,
  cert,
  getApp,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const credentials: ServiceAccount = {
  projectId: process.env.projectID,
  privateKey: process.env.privateKey.replace(/\\n/g, "\n"),
  clientEmail: process.env.clientEmail,
};

const options: AppOptions = {
  credential: cert(credentials),
  databaseURL: process.env.databaseURL,
};

function createFirebaseAdminApp(config: AppOptions) {
  if (getApps().length === 0) {
    return initializeApp(config, "Server-Firebase");
  } else {
    return getApp("Server-Firebase");
  }
}

const firebaseAdmin = createFirebaseAdminApp(options);

export const adminAuth = getAuth(firebaseAdmin);
