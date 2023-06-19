import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Logo from '../assets/drift-high-resolution-logo-color-on-transparent-background.png';

function Register() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("form");
    }
    const handleChange = (e) => {}
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
    background-color: #0E143D;
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
`

export default Register