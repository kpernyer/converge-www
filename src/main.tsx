import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { Layout } from '@/app/Layout';
import { Home } from '@/app/pages/Home';
import { Domain } from '@/app/pages/Domain';
import { Provider } from '@/app/pages/Provider';
import { Tools } from '@/app/pages/Tools';
import { Manifesto } from '@/app/pages/Manifesto';
import { Demo } from '@/app/pages/Demo';
import '@/styles/reset.css';
import '@/styles/tokens.css';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="domain" element={<Domain />} />
            <Route path="provider" element={<Provider />} />
            <Route path="tools" element={<Tools />} />
            <Route path="manifesto" element={<Manifesto />} />
            <Route path="demo" element={<Demo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
