import createContext from "contexts/createContext";
import { onIdTokenChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import nookies from "nookies";
import { firebaseAuth } from "services/firebase";

type AuthContext = {
  user: User | null;
};

export const [useAuth, CtxProvider] = createContext<AuthContext>();

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(firebaseAuth, async (userState) => {
      if (userState) {
        const expiresIn = 60 * 60 * 24 * 5; //expires in 5 days
        const token = await userState.getIdToken();
        setUser(userState);
        nookies.set(undefined, "token", token, { maxAge: expiresIn });
      } else {
        setUser(null);
        nookies.destroy(null, "token", {});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CtxProvider
      value={{
        user,
      }}
    >
      {children}
    </CtxProvider>
  );
}
