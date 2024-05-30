/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Navigate } from "react-router-dom";
import { DataClass, FirebaseService } from "../utility";
import { useObjectVal } from "react-firebase-hooks/database";
import { ref } from "firebase/database";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const onAuthStateChanged = async (user) => {
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    if (loading) setLoading(false);
  };

  useEffect(() => {
    const subscriber =
      FirebaseService.auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const logout = () => {
    FirebaseService.auth.signOut();
  };

  const contextData = useMemo(
    () => ({
      loading,
      user,
      isAuthenticated,
      logout,
    }),
    [loading, user, isAuthenticated, logout],
  );

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ redirectPath = "/login", children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [gameData, gameLoading] = useObjectVal(
    ref(FirebaseService.database, "gameData"),
  );

  useEffect(() => {
    DataClass.setData(gameData);
  }, [gameData]);

  if (loading || gameLoading) {
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
