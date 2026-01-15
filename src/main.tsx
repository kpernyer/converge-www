import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { Layout } from '@/app/Layout';
import { Home } from '@/app/pages/Home';
import '@/styles/reset.css';
import '@/styles/tokens.css';
import '@/styles/index.css';

// Lazy load pages for better initial bundle size
const Core = lazy(() => import('@/app/pages/Core').then((m) => ({ default: m.Core })));
const Domain = lazy(() => import('@/app/pages/Domain').then((m) => ({ default: m.Domain })));
const Provider = lazy(() => import('@/app/pages/Provider').then((m) => ({ default: m.Provider })));
const Tools = lazy(() => import('@/app/pages/Tools').then((m) => ({ default: m.Tools })));
const Ledger = lazy(() => import('@/app/pages/Ledger').then((m) => ({ default: m.Ledger })));
const Runtime = lazy(() => import('@/app/pages/Runtime').then((m) => ({ default: m.Runtime })));
const Mobile = lazy(() => import('@/app/pages/Mobile').then((m) => ({ default: m.Mobile })));
const Manifesto = lazy(() => import('@/app/pages/Manifesto').then((m) => ({ default: m.Manifesto })));
const Demo = lazy(() => import('@/app/pages/Demo').then((m) => ({ default: m.Demo })));
const Signals = lazy(() => import('@/app/pages/Signals').then((m) => ({ default: m.Signals })));
const SignalArticle = lazy(() => import('@/app/pages/SignalArticle').then((m) => ({ default: m.SignalArticle })));
const Presentations = lazy(() => import('@/app/pages/Presentations').then((m) => ({ default: m.Presentations })));
const DemoTravel = lazy(() => import('@/app/pages/DemoTravel').then((m) => ({ default: m.DemoTravel })));

// Minimal loading fallback
function PageLoader() {
  return <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>Loading...</div>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="core" element={<Core />} />
              <Route path="domain" element={<Domain />} />
              <Route path="provider" element={<Provider />} />
              <Route path="tools" element={<Tools />} />
              <Route path="ledger" element={<Ledger />} />
              <Route path="runtime" element={<Runtime />} />
              <Route path="mobile" element={<Mobile />} />
              <Route path="manifesto" element={<Manifesto />} />
              <Route path="demo" element={<Demo />} />
              <Route path="demo/travel" element={<DemoTravel />} />
              <Route path="signals" element={<Signals />} />
              <Route path="signals/:slug" element={<SignalArticle />} />
              <Route path="presentations" element={<Presentations />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
