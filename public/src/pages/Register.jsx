import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Logo from '../assets/drift-high-resolution-logo-color-on-transparent-background.png';
import { registerRoute } from '../utils/apiRoutes';

const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
};

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if(localStorage.getItem('drift-user')) {
            navigate('/');
        }
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {username, email, password}, {
                headers: {
                  'Content-Type': 'application/json',
                }
            });
            if(data.status===false) {
                toast.error(data.msg, toastOptions);
            }
            if(data.status===true) {
                localStorage.setItem('drift-user', JSON.stringify(data.user));
                navigate('/');
            }
        }
    }

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if(password!==confirmPassword) {
            toast.error("Passwords entered do not match", toastOptions);
            return false;
        }
        else if(username.length<3) {
            toast.error("Please choose a username with at least 3 characters", toastOptions);
            return false;
        }
        else if(password.length<8) {
            toast.error("Password is not long enough! Please use 8+ characters", toastOptions);
            return false;
        }
        else if(email==="") {
            toast.error("An email address is required", toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src={Logo} alt="Drift Logo" />
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Re-type password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Create User</button>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #1a2047;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .brand {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        img {
            height: 5rem;
        }
    }
    form {
        padding: 3rem 5rem;
        display: flex;
        flex-direction: column;
        gap: 2.2rem;
        background-color: #070b21;
        border-radius: 1rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid;
            border-color: #00CDCD #070b21;
            border-radius: 0.2rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            transition: 0.2s;
            &:focus {
                border-color: #FFE8B5 #00000076;
                outline: none;
            }
        }
        button {
            padding: 1rem 2rem;
            background-color: #00CDCD;
            color: #0E143D;
            position: relative;
            overflow: hidden;
            border: none;
            border-radius: 0.4rem;
            font-weight: bold;
            cursor: pointer;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.2s ease-in-out;
            &::after {
                content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%2300CDCD' fill-opacity='1' d='M0,64L21.8,58.7C43.6,53,87,43,131,85.3C174.5,128,218,224,262,245.3C305.5,267,349,213,393,202.7C436.4,192,480,224,524,213.3C567.3,203,611,149,655,154.7C698.2,160,742,224,785,250.7C829.1,277,873,267,916,261.3C960,256,1004,256,1047,229.3C1090.9,203,1135,149,1178,122.7C1221.8,96,1265,96,1309,101.3C1352.7,107,1396,117,1418,122.7L1440,128L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
                position: absolute;
                width: 105%;
                left: -20px;
                bottom: -5rem;
                transition: 0.4s ease-out;
            }
            &:hover {
                background-color: #FFE8B5;
            }
            &:active::after {
                left: 0;
                bottom: -1.6rem;
            }
            &:active {
                background-color: #FFE8B5;
            }
        }
        span {
            color: white;
            align-self: center;
            a {
                color: #00CDCD;
                text-transform: uppercase;
                text-decoration: none;
                font-weight: bold;
                &:hover {
                    color: #FFE8B5;
                }
            }
        }
    }
    @keyframes seashore {
        0%: {
            bottom: -5rem;
            left: -20px;
        }
        80%: {
            bottom: -3rem;
            left: -20px;
        }
        100%: {
            bottom: -2rem;
            left: 0;
        }
    }
`

export default Register