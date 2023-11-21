import { useRoutes, Navigate } from 'react-router-dom'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ClientPage from './pages/ClientPage'
import Auth from './pages/Auth'
import AuthGuard from './components/AuthGuard'



export default function Router() {

    const elements = useRoutes([
        {
            path: "auth", element: <Auth />, children: [
                { path: 'signIn', element: <SignIn /> },
                { path: 'signUp', element: <SignUp /> },
            ]
        },
        {
            path: '/', element: <AuthGuard />, children: [
                { path: "clientPage", element: <ClientPage /> }
            ]

        },
        
        { path: '*', element: <Navigate to='/' /> }
    ])

    return <>
        {elements}
    </>
}