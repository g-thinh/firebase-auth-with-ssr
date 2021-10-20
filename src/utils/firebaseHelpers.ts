import { signOut, AuthError } from "firebase/auth";
import { firebaseAuth } from "services/firebase";
import Router from "next/router";

export async function signUserOut() {
  signOut(firebaseAuth)
    .then(async () => {
      await fetch("/api/logout");
      Router.push("/");
    })
    .catch((error: AuthError) => {
      console.log("An error occured", error.code, error.message);
    });
}
