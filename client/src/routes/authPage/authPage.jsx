import './authPage.css'; 
import Image from '../../components/imageComponent/imageComponent';
import { useState } from 'react';

const AuthPage = () => {

    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");

    return (
        <div className="authPage">
            <div className="authContainer">
                <Image path="/general/logo.png" />
                <h1>{isRegister ? "Create a new account" : "Login to your account"}</h1>
                {isRegister ? (
                    <form key="register">
                        <div className="formGroup">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                required placeholder='Username'
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="displayname">Name</label>
                            <input 
                                type="text" 
                                id="displayname" 
                                name="displayname" 
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
                    <form key="login">
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