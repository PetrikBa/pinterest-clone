import './authPage.css'; 
import Image from '../../components/imageComponent/imageComponent';
import { useState } from 'react';
import apiRequest from '../../utils/apiRequest';
import { useNavigate } from 'react-router';

const AuthPage = () => {

    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        try {
            const res = await apiRequest.post(`/users/auth/${isRegister ? 'register' : 'login'}`, data);
            navigate('/');
        } catch (error) {
            setError(error?.response?.data?.message || error?.message || 'Registration failed');
        }
    }

    return (
        <div className="authPage">
            <div className="authContainer">
                <Image path="/general/logo.png" />
                <h1>{isRegister ? "Create a new account" : "Login to your account"}</h1>
                {isRegister ? (
                    <form key="register" onSubmit = {handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="userName" 
                                required placeholder='Username'
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="displayname">Name</label>
                            <input 
                                type="text" 
                                id="displayname" 
                                name="displayName" 
                                required
                                placeholder='Name'
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required placeholder='Email'
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required placeholder='Password'
                            />
                        </div>
                        <button type="submit" >Register</button>
                        <p onClick={() => setIsRegister(false)}>
                            Do you have an account? <b>Login</b>
                        </p>
                        {error && 
                            <p className='error' >{error}</p>
                        }
                    </form>
                ) : (
                    <form key="login" onSubmit = {handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required placeholder='Email'
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required placeholder='Password'
                        />
                    </div>
                    <button type="submit" >Login</button>
                    <p onClick={() => setIsRegister(true)}>
                        Don't have an account? <b>Register</b>
                    </p>
                    {error && 
                        <p className='error' >{error}</p>
                    }
                </form>
                )}
            </div>
        </div>
    );
}

export default AuthPage;