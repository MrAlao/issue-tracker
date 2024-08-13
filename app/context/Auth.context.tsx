import { User } from "lucia";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Response {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = createContext<Response | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const res = await fetch("/api/authdata");
      if (res.ok) {
        const data = await res.json();
        setUser(data as User);
      }
      setIsLoading(false);
    }

    checkSession();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
