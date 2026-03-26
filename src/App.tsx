import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueueProvider } from '@/context/QueueContext'
import Home from '@/pages/Home'
import ProviderDetail from '@/pages/ProviderDetail'
import Queue from '@/pages/Queue'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/provider/:id', element: <ProviderDetail /> },
  { path: '/queue/:id', element: <Queue /> },
])

export default function App() {
  return (
    <QueueProvider>
      <RouterProvider router={router} />
    </QueueProvider>
  )
}
