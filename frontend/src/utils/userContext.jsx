import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const updateCartId = (cartId) => {
    setUser((prevUser) => ({
      ...prevUser,
      cart: cartId,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, updateCartId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);