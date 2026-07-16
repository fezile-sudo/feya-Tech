import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

const [user, setUser] = useState(() => {

const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  });

const [users, setUsers] = useState(() => {

const savedUsers = localStorage.getItem("users");

    return savedUsers
      ? JSON.parse(savedUsers)
      : [];

  });

  useEffect(() => {

    localStorage.setItem( "users", JSON.stringify(users) );

  }, [users]);

  useEffect(() => {

    if (user) {

      localStorage.setItem( "user", JSON.stringify(user));

    } else {

      localStorage.removeItem("user");

    }

  }, [user]);

  const register = (userData) => {

  const existingUser = users.find( (u) => u.email === userData.email );

    if (existingUser) {

      return {
        success: false,
        message: "Email already exists."
      };

    }

  const newUser = {id: Date.now(), name: userData.name, email: userData.email, password: userData.password };

    setUsers([
      ...users,
      newUser
    ]);

    setUser(newUser);

    return {
      success: true
    };

  };

  const login = (email, password) => {

  const existingUser = users.find((u) => u.email === email && u.password === password );

    if (!existingUser) {

      return {
        success: false,
        message: "Invalid email or password."
      };

    }

    setUser(existingUser);

    return {
      success: true
    };

  };

  const logout = () => {

    setUser(null);

  };

  return (

    <AuthContext.Provider value={{user, users, register, login, logout}}>

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => {

  return useContext(AuthContext);

};