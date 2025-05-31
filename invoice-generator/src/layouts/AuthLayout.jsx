import { Outlet } from 'react-router-dom'
import Loader from '../components/Loader'
import { Suspense } from 'react'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default AuthLayout