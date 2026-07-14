import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({isLoggedIn}) {

    // Redirect unauthenticated users to the login page
    if(!isLoggedIn){
        return <Navigate to="/" replace/>
    }

    return <Outlet/>
  
}
