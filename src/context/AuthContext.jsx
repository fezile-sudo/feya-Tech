import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";


const AuthContext = createContext();


const API_URL = "http://localhost:5000/api";


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  });


  const [token, setToken] = useState(() => {

    return localStorage.getItem("token");

  });


  useEffect(() => {

    if (user) {

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

    } else {

      localStorage.removeItem("user");

    }

  }, [user]);


  useEffect(() => {

    if (token) {

      localStorage.setItem(
        "token",
        token
      );

    } else {

      localStorage.removeItem("token");

    }

  }, [token]);


  // REGISTER
  const register = async (userData) => {

    try {

      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(userData)
        }
      );


      const data = await response.json();


      if (!response.ok) {

        return {
          success: false,
          message: data.message || "Registration failed."
        };

      }


      setUser(data.user);

      setToken(data.token);


      return {
        success: true,
        user: data.user
      };


    } catch (error) {

      console.error(
        "REGISTER ERROR:",
        error
      );

      return {
        success: false,
        message: "Unable to connect to server."
      };

    }

  };


  // LOGIN
  const login = async (email, password) => {

    try {

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );


      const data = await response.json();


      if (!response.ok) {

        return {
          success: false,
          message: data.message || "Invalid email or password."
        };

      }


      setUser(data.user);

      setToken(data.token);


      return {
        success: true,
        user: data.user
      };


    } catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      return {
        success: false,
        message: "Unable to connect to server."
      };

    }

  };


  // LOGOUT
  const logout = () => {

    setUser(null);

    setToken(null);

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


export const useAuth = () => {

  return useContext(AuthContext);

};
