import React, { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueueProvider } from '@/context/QueueContext'

const Home = React.lazy(() => import('@/pages/Home'))
const ProviderDetail = React.lazy(() => import('@/pages/ProviderDetail'))
const Queue = React.lazy(() => import('@/pages/Queue'))

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/provider/:id', element: <ProviderDetail /> },
  { path: '/queue/:id', element: <Queue /> },
])

export default function App() {
  return (
    <QueueProvider>
      <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueueProvider>
  )
}
