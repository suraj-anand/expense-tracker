import { useState } from 'react'
import { Navbar, LoginForm, RegisterForm } from '@components'

const Login = () => {

    const [ view, setView ] = useState("login")

    function handleCreateAccountClick(event){
        event.preventDefault();
        setView("signup");
    }

    function handleAlreadyAUser(event){
        event.preventDefault();
        setView("login");
    }

    return (
        <>
            <div className="min-vh-100">
                <Navbar />
                <div className="vh-100 container-fluid d-flex flex-column align-items-center justify-content-center">

                    { 
                        view === "login" && 
                        <>
                            <p>Here for the first time, <a href="" onClick={handleCreateAccountClick}>Create Account</a></p>
                            <LoginForm />
                        </>
                    }
                    { 
                        view === "signup" && 
                        <>
                            <p>Already a User, <a href="" onClick={handleAlreadyAUser}>Log in</a></p>
                            <RegisterForm />
                        </>    
                    }
                    
                </div>
            </div>
        </>
    )
}


export default Login