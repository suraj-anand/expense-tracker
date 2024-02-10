import axios from 'axios';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


export default function RegisterForm(){

    const navigate = useNavigate();
    const { register, getValues } = useForm();
    const [ error, setError ] = useState("") 
    const [ loading, setLoading ] = useState(false);

    async function handleRegister(event){
        setLoading(true);
        event.preventDefault();
        const payload = {
            "first_name": getValues()?.first_name,
            "last_name": getValues()?.last_name,
            "username": getValues()?.email,
            "password": getValues()?.password
        }
        try {
            const response = await axios.post("/api/register/", {...payload});
            if([200, 201].includes(response.status)){
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("token", response.data?.token);
                navigate("/");
            }
        } catch(error) {
            setError("Failed on registering...");
            setTimeout(() => {setError("")}, 2000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <div className="row">
                <div className="d-flex justify-content-center col-12 col-lg-6">
                    <input type="text" 
                        name="firstname" id="firstname" 
                        placeholder='Firstname'
                        autoComplete='off'
                        className='login-input form-control my-3' 
                        style={{
                                width: "20rem",
                            }}
                        required
                        {...register("first_name")}
                        />
                </div>

                <div className="d-flex justify-content-center col-12 col-lg-6">
                    <input type="text" 
                        name="lastname" id="lastname" 
                        placeholder='Lastname'
                        autoComplete='off'
                        className='login-input form-control my-3' 
                        required
                        style={{
                                width: "20rem",
                            }}
                        {...register("last_name")}
                        />
                </div>
            </div>
            
            <div className="row">
                <div className="d-flex justify-content-center col-12 col-lg-6">
                    <input type="email" 
                        name="email" id="email" 
                        placeholder='Email'
                        autoComplete='off'
                        className='login-input form-control my-3' 
                        required
                        style={{
                                width: "20rem",
                            }}
                        {...register("email")}
                        />
                </div>

                <div className="d-flex justify-content-center col-12 col-lg-6">
                    <input type="password" 
                        name="password" id="password" 
                        placeholder='Password'
                        autoComplete='off'
                        className='login-input form-control my-3' 
                        style={{
                                width: "20rem",
                            }}
                        required
                        {...register("password")}
                        />
                </div>
            </div>

            <div className="d-flex flex-column align-items-center">
                    { loading && <Spinner className='mb-5 text-white' /> }
                    { error && <p className='mb-5 text-danger fs-5'>{error}</p> }
                <input type="submit" value="Register" className='login-btn rounded-pill fw-bold shadow-lg mt-4' />
            </div>

        </form>
    )
}