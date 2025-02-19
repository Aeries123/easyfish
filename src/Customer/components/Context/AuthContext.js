import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  console.log("A Updated")

  useEffect(() => {
    const token = Cookies.get("jwtToken");

    if (token) {
      fetch(`${BASE_URL}/api/get/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.profile && data.profile.customer_name) {
            setUserName(data.profile.customer_name); // Set the username
          }
        })
        .catch((error) => console.error("Error fetching user details:", error));
    } else {
      setUserName(null); // If no token, reset the userName
    }
  }, [userName]); // Run this effect only once when the component mounts

  return (
    <AuthContext.Provider value={{ userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
