// src/App.jsx
// Reworked from the Base44 version. Key change: the marketing site is PUBLIC.
// Previously every route sat behind ProtectedRoute (whole site required login).
// Now only the pages in PROTECTED_PAGES are gated.
//
// REVIEW BEFORE USING: the names in PROTECTED_PAGES must exactly match the
// keys in pages.config.js (which mirror the filenames in src/pages/).
// While auth is undecided, PROTECTED_PAGES can stay empty — everything public.

import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { pagesConfig } from './pages.config';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const { Pages, Layout, mainPage } = pagesConfig;

// Pages that require a signed-in user. Everything else is public.
// Candidates once real auth exists: 'StartJourney', 'AIAgent', 'Subscription'
const PROTECTED_PAGES = [];

const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : () => <></>;

const LayoutWrapper = ({ children, currentPageName }) =>
  Layout ? (
    <Layout currentPageName={currentPageName}>{children}</Layout>
  ) : (
    <>{children}</>
  );

const publicEntries = Object.entries(Pages).filter(
  ([name]) => !PROTECTED_PAGES.includes(name)
);
const protectedEntries = Object.entries(Pages).filter(([name]) =>
  PROTECTED_PAGES.includes(name)
);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>
            {/* Landing page — public */}
            <Route
              path="/"
              element={
                <LayoutWrapper currentPageName={mainPageKey}>
                  <MainPage />
                </LayoutWrapper>
              }
            />

            {/* Public pages (marketing, info, contact, AI showcase...) */}
            {publicEntries.map(([path, Page]) => (
              <Route
                key={path}
                path={`/${path}`}
                element={
                  <LayoutWrapper currentPageName={path}>
                    <Page />
                  </LayoutWrapper>
                }
              />
            ))}

            {/* Gated pages — only what truly needs identity */}
            <Route
              element={
                <ProtectedRoute
                  unauthenticatedElement={<Navigate to="/" replace />}
                />
              }
            >
              {protectedEntries.map(([path, Page]) => (
                <Route
                  key={path}
                  path={`/${path}`}
                  element={
                    <LayoutWrapper currentPageName={path}>
                      <Page />
                    </LayoutWrapper>
                  }
                />
              ))}
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
