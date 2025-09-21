import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { webRoutes } from './web'
import { RootState } from '@/store'

const Redirect = () => {
  const admin = useSelector((state: RootState) => state.admin)

  return <Navigate to={admin ? webRoutes.Dashboard : webRoutes.login} replace />
}

export default Redirect
