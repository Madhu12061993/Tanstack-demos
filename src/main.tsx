import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css';


const queryclient = new QueryClient({
  defaultOptions: { queries: { staleTime:60000 , gcTime: 10 * (60 * 1000 ) }},
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
    <App />
    </QueryClientProvider>
  </StrictMode>,
)
