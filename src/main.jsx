import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routers/Routers';
import AuthProvider from './AuthProviders/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const client =new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider >
  </React.StrictMode>,
)
