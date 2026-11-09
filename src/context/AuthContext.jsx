import { createContext, useContext, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage';

// DEMO AUTH ONLY: users live in localStorage and passwords are stored as plain text.
// A real app needs a backend (hashing, sessions/JWT). This is enough for the bonus task.
const AuthContext = createContext(null);
const USERS_KEY = 'bookstore_users';
const SESSION_KEY = 'bookstore_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(SESSION_KEY, null));

  const startSession = (u) => {
    const session = { name: u.name, email: u.email };
    setUser(session);
    writeStorage(SESSION_KEY, session);
  };

  const register = ({ name, email, password }) => {
    const users = readStorage(USERS_KEY, []);
    if (users.some((u) => u.email === email.toLowerCase())) {
      throw new Error('An account with this email already exists. Try signing in.');
    }
    const newUser = { name, email: email.toLowerCase(), password };
    writeStorage(USERS_KEY, [...users, newUser]);
    startSession(newUser);
  };

  const login = ({ email, password }) => {
    const users = readStorage(USERS_KEY, []);
    const found = users.find((u) => u.email === email.toLowerCase() && u.password === password);
    if (!found) throw new Error('Email or password is incorrect.');
    startSession(found);
  };

  const logout = () => {
    setUser(null);
    writeStorage(SESSION_KEY, null);
  };

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
