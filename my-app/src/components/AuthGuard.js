import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

export default function AuthGuard() {

    const userId = useSelector(state => state.auth.id)

    if (!userId) {
        return <Navigate to='/auth/signIn' />
    }

    return <Outlet />
}



