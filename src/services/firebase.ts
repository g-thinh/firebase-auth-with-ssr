import { FirebaseOptions, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
  appId: process.env.appId,
  projectId: process.env.projectID,
};

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config, "Client-Firebase");
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export default firebaseApp;
