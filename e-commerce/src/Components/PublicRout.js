import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PublicRout = () => {

    const token = localStorage.getItem('token')
    return (token ? <Outlet /> : <Navigate to='/' />)

}

export default PublicRout