import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Dashboard, Login, Register, ErrorElement, GuestDashboard } from './components/Components.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        errorElement: <ErrorElement />
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorElement />
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <ErrorElement />
    },
    {
        path: '/guest',
        element: <GuestDashboard />,
        errorElement: <ErrorElement />
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
