import createContext from "contexts/createContext";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Router from "next/router";
import { useEffect, useState } from "react";
import { firebaseAuth } from "services/firebase";

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticating: boolean;
  setIsAuthenticating: React.Dispatch<React.SetStateAction<boolean>>;
  signUserOut: () => void;
};

export const [useAuth, CtxProvider] = createContext<AuthContext>();

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  async function signUserOut() {
    signOut(firebaseAuth)
      .then(async () => {
        await fetch("/api/logout");
        setUser(null);
        Router.push("/");
      })
      .catch((error) => {
        console.log("An error occured", error.code, error.message);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (userState) => {
      if (userState) {
        setUser(userState);
        setIsAuthenticating(false);
      } else {
        setUser(null);
        setIsAuthenticating(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CtxProvider
      value={{
        user,
        setUser,
        isAuthenticating,
        setIsAuthenticating,
        signUserOut,
      }}
    >
      {!isAuthenticating && children}
    </CtxProvider>
  );
}
