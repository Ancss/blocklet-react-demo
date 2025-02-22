import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { store } from './store/index';
import Home from './pages/home';
import ThemeWrapper from './context/theme-wrapper';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div className="app">
      <Provider store={store}>
        <ThemeWrapper>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </QueryClientProvider>
        </ThemeWrapper>
      </Provider>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
