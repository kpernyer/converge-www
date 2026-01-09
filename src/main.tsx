import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/app/Layout';
import { Home } from '@/app/pages/Home';
import { Domain } from '@/app/pages/Domain';
import { Provider } from '@/app/pages/Provider';
import { Tools } from '@/app/pages/Tools';
import '@/styles/reset.css';
import '@/styles/tokens.css';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="domain" element={<Domain />} />
          <Route path="provider" element={<Provider />} />
          <Route path="tools" element={<Tools />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
