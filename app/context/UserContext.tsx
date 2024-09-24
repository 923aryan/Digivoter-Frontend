// context/UserContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserDetails {
  firstName: string,
  middleName: string,
  lastName: string,
  DateOfBirth: Date,
  age: string,
  aadharID: string,
  phoneNumber: string,
  image: string | null;
}

interface UserCredential {
  email: string, 
  password: string
}



interface UserContextProps {
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  credential: UserCredential;
  setCredential: React.Dispatch<React.SetStateAction<UserCredential>>;
  loggedInUser: User| null,
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: '',
    middleName: '',
    lastName: '',
    DateOfBirth: new Date(1598051730000),
    age: '',
    aadharID: '',
    phoneNumber: '',
    image: null,
  });

  const [loggedInUser, setLoggedInUser] = useState<null | User>(null)

  const [credential, setCredential] = useState<UserCredential>({email: '', password: ''})

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails,credential , setCredential, loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
