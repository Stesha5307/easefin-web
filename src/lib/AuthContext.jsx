// src/lib/AuthContext.jsx
// Guest-mode replacement for the Base44 AuthContext.
//
// It preserves the EXACT interface of the original —
//   { user, isAuthenticated, isLoadingAuth, isLoadingPublicSettings,
//     authError, appPublicSettings, logout, navigateToLogin, checkAppState }
// — so every component that calls useAuth() keeps compiling.
//
// Behavior: everyone is an anonymous guest. The marketing site is public;
// features that truly need identity should be gated in App.jsx.
//
// TODO (auth decision pending): replace internals with real auth
// (own FastAPI JWT auth, or Supabase/Clerk) without changing the interface.

import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useState(null);
  const [isAuthenticated] = useState(false);

  // The Base44 version loaded remote settings; we have none, so never "loading".
  const isLoadingAuth = false;
  const isLoadingPublicSettings = false;
  const authError = null;
  const appPublicSettings = null;

  const logout = useCallback(() => {
    // No session to clear yet. Real implementation: clear token + redirect.
  }, []);

  const checkAppState = useCallback(async () => {
    // No remote app state anymore. Kept for interface compatibility.
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        logout,
        navigateToLogin: () => {
          // Original redirected to Base44's hosted login.
          window.location.href = '/login';
        },
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
