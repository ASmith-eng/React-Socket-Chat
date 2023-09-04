import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { BiPowerOff } from 'react-icons/bi';

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
        </Button>
    )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: rgb(4,7,24);
    background: linear-gradient(40deg, rgba(4,7,24,1) 0%, rgba(26,32,71,1) 14%, rgba(5,105,162,1) 44%, rgba(0,205,205,1) 100%);
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: white;
    }
`;