import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface UserPros {
  uid: string;
  displayName: string;
  photoURL: string;
}

interface SignGoogleContextData {
  handleGoogleSignIn: () => void;
  user: UserPros;
}

interface SignGoogleProviderProps {
  children: ReactNode;
}

export const SignGoogleContext = createContext({} as SignGoogleContextData);

export function SignGoogleProvider({ children }: SignGoogleProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const router = useRouter();

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    setPersistence(auth, browserSessionPersistence);

    await signInWithPopup(auth, provider).then((result) => {
      setUser(result.user);
    });

    router.push("/home");
  }

  let name = user.displayName;
  let photo = user.photoURL;

  useEffect(() => {
    Cookies.set("name", String(name));
    Cookies.set("photo", String(photo));
  }, []);

  return (
    <SignGoogleContext.Provider value={{ handleGoogleSignIn, user }}>
      {children}
    </SignGoogleContext.Provider>
  );
}
