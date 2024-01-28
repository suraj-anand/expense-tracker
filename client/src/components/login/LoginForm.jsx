import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LoginForm(){

    const navigate = useNavigate();
    const { register, getValues } = useForm();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    async function handleLogin(event){
        event.preventDefault();
        const payload = {
            "username": getValues()?.username,
            "password": getValues()?.password,
        }

        setLoading(true);
        try{
            const response = await axios.post("/api/login/", {...payload})
            if ([200, 201].includes(response.status)){
                navigate("/");
            }
        } catch(error) {
            console.log(error)
            setError(error?.response.data.error);
            setTimeout(() => {setError("")}, 3000)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <form onSubmit={handleLogin}>
            <input type="text" 
                name="username" id="username" 
                placeholder='Username'
                autoComplete='off'
                className='login-input form-control my-3' 
                required
                style={{
                        width: "25rem",
                        }}
                {...register("username")}
                />

            <input type="password" 
                name="password" id="password" 
                placeholder='Password'
                autoComplete='off'
                className='login-input form-control mt-3 mb-5' 
                required
                style={{width: "25rem"}}
                {...register("password")}
                    />
            
            <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                { loading && <Spinner className='mb-5 text-white' /> }
                { error && <p className='mb-5 text-danger fs-5'>{error}</p> }
                <input type='submit' className='login-btn rounded-pill fw-bold shadow-lg' value={"Login"} />
            </div>
        </form>
        </>
    )
}