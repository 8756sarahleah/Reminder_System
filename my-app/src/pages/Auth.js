import { NavLink, Outlet } from 'react-router-dom'

export default function Auth() {

    return <>
 
        <nav>
            <NavLink to="/auth/signIn">sign in </NavLink>
            <NavLink to="/auth/signUp">sign up </NavLink>
        </nav>
        <Outlet />
    </>
}
