import { useContext, useEffect, useState } from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext, AuthContextProvider } from '@src/context/AuthContext'
import { Login } from '@src/pages'

const ProtectedRoutes = () => {

    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(true);
    
    const navigate = useNavigate();

    async function checkAuthenticated(){
        setLoading(true);
        try {
            const response = await axios.get("/api/isAuthenticated/");
            if(response.status === 200){
                setAuthenticated(true);
                localStorage.setItem("isAuthenticated", true);
            }
        } catch(error) {
            localStorage.setItem("isAuthenticated", false);
            setAuthenticated(false);
            console.log(error);
            navigate("/login");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuthenticated();
    }, [])

    return (
        <>
            {
                loading ? <Spinner />
                : authenticated ? <Outlet /> : <Login />
            }
        </>
    )
}
function Spinner(){
    return (
        <>
            <div className='d-flex min-vh-100 align-items-center justify-content-center'>
                <div className="spinner-border text-white"></div>
            </div>
        </>
    )
}

export default ProtectedRoutes