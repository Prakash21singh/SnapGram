import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Defining the initial state
export const INITIAL_USER = {
  id: "",
  username: "",
  name: "",
  email: "",
  imageUrl: "",
  bio: "",
};

//Defining the context that will be provided to the user
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

//Defining type for the context
type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

//Created the context for the APP
const AuthContext = createContext<IContextType>(INITIAL_STATE);

//Created the provider that is going to provide the context
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
      }
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  //Checking if the user logged in or not
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");

    if (cookieFallback === "[]" || cookieFallback === null)
      navigate("/sign-in");
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

//Custom hook to get context values
export const useUserContext = () => {
  return useContext(AuthContext);
};
