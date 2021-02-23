import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if( isFormValid ) {
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }

    }

    const isFormValid = () => {
        
        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is required') )
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') )
            return false;
        } else if ( password.length < 5 ) {
            dispatch( setError('Password should be at least 8 characters') )
            return false
        }
        
        dispatch( removeError() );
       return true;
    }

    return (
        <div>
            <div className="limiter animate__animated animate__fadeIn animate__faster">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-50 p-b-90">
                        <form onSubmit={ handleRegister } className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-51">Create new account</span>
                            { msgError && (
                                <div className="container-loginError-form-btn m-b-16 animated fadeIn">
                                    <p className="container-loginError-form-btn">{ msgError }</p>
                                </div> 
                                )
                            }
                            <div className="wrap-input100 m-b-16">
                                <h1 className="formGroup__Label">Name*</h1>   
                                <input className="input100" type="text" name="name" value={ name } onChange={ handleInputChange } minLength="2" required placeholder="Full name" autoComplete="off" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 m-b-16">
                                <h1 className="formGroup__Label">Email*</h1>   
                                <input className="input100" type="email" name="email" value={ email } onChange={ handleInputChange } required placeholder="Enter your email" autoComplete="off" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 m-b-16">
                                <h1 className="formGroup__Label">Password*</h1>   
                                <input className="input100" type="password" name="password" value={ password } onChange={ handleInputChange } minLength="6" required placeholder="Enter your password" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="flex-sb-m w-full p-t-3 p-b-24">
                                <div>
                                    <Link to="/auth/login" className="txt1">Already register? / Login</Link>
                                </div>
                            </div>
                            <div className="container-login100-form-btn m-t-17">
                                <button onClick={ handleRegister } className="login100-form-btn" type="submit">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
