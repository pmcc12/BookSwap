import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInterface from './types';

const initialState = {
  id: '',
  token: '',
  auth: false,
};

/* when we want to pass setState as props and we need to define props type:
React.Dispatch<SetStateAction<*type of variable (can be string,number,other interface)*>>
*/

const initialContext = {
  user: initialState,
  login:  (accesstoken: string, id:string) => {},
  logout: () => {},
}

const UserContext = createContext(initialContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserInterface>();

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
    <UserContext.Provider value={{user, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };