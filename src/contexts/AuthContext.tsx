import createContext from "contexts/createContext";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAuth } from "services/firebase";

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticating: boolean;
  setIsAuthenticating: React.Dispatch<React.SetStateAction<boolean>>;
};

export const [useAuth, CtxProvider] = createContext<AuthContext>();

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

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
      }}
    >
      {!isAuthenticating && children}
    </CtxProvider>
  );
}
