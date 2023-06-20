import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Logo from '../assets/drift-high-resolution-logo-color-on-transparent-background.png';

function Register() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("form");
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
                        Already have an account? <Link to="/Login">Login</Link>
                    </span>
                </form>
            </FormContainer>
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
            border: none;
            border-radius: 0.4rem;
            font-weight: bold;
            cursor: pointer;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.2s ease-in-out;
            &:hover {
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
`

export default Register