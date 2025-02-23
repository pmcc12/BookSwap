import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  id: '',
  token: '',
  auth: false,
};

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (Accesstoken, id) => {
    setUser((prevState) => ({
      token: Accesstoken,
      id: id,
      auth: true,
    }));
  };

  const logout = () => {
    setUser(initialState);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
