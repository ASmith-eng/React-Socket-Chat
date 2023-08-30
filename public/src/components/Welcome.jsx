import React from 'react';
import styled from 'styled-components';

import whale from '../assets/whale.gif';

export default function Welcome({currentUser}) {
    return (
        <Container>
            <div className="gif-container">
                <img src={whale} alt="A whale breaches the ocean surface" />
            </div>
            <h1>
                Ahoy, <span>{currentUser.username}!</span>
            </h1>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.6rem;
    background-color: #070b21;
    color: white;
    border-radius: 0 0.8rem 0.8rem 0;
    .gif-container {
        height: 18vw;
        width: 18vw;
        background-color: white;
        border-radius: 900px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 12.5vw;
        }
    }
    span {
        color: #00CDCD;
    }
`;