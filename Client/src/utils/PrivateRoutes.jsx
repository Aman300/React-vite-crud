import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = localStorage.getItem('token')
    auth = JSON.parse(auth)
    console.log(auth)
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
