import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <>
            <div className="limiter animate__animated animate__fadeIn animate__faster">
                <div className="container-login100">
                    <div className="wrap-login100 ">
                        <h1 className="login100-form-title p-b-51">Login</h1>
                        <form onSubmit={ handleLogin } className="login100-form validate-form flex-sb flex-w">
                            <div className="formGroup">
                                <div className="wrap-input100 m-b-16" data-validate="Email is required">
                                    <h1 className="formGroup__Label">Email</h1>   
                                    <input className="input100" type="email" name="email" value={ email } onChange={ handleInputChange } required minLength="6" placeholder="Type your email" autoComplete="off" />
                                    <span className="focus-input100"></span>
                                </div>
                                <div className="wrap-input100 m-b-16" data-validate="Password is required">
                                    <h1 className="formGroup__Label">Password</h1>
                                    <input className="input100" type="password" name="password" value={ password } onChange={ handleInputChange } required minLength="6" placeholder="Type your password" autoComplete="off" />
                                    <span className="focus-input100"></span>
                                </div>
                            </div>
                            <div className="flex-sb-m w-full m-b-30">
                                <div>
                                    <Link to="/auth/register" className="txt1">Don't have an account ? / Register</Link>
                                </div>
                            </div>
                            <div className="container-login100-form-btn">
                                <button onClick={ handleLogin } className="login100-form-btn" type="submit">Log in</button>
                            </div>
                            <h1 className="iconListTitle">Or login with</h1>
                            <div className="auth__socialNetworks">
                                <div className="google-btn" onClick={ handleGoogleLogin }>
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon btn-block" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                    </div>
                                    <p className="btn-text"><b>Sign in with google</b></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}
