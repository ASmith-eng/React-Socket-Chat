import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import periscope from '../assets/periscope.gif';

function PageNotFound() {
    return (
        <Container>
            <span className="response-code">404</span>
            <div className="gif-container">
                    <img src={periscope} alt="A periscope breaks the surface of the ocean waves" className="gif" />
            </div>
            <span>Uh oh, we can't find that page captain!</span>
            <Link to="/">Back to home</Link>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    color: white;
    font-size: 1.2rem;
    background-color: #1a2047;
    .gif-container {
        height: 18vw;
        width: 18vw;
        background-color: white;
        border-radius: 900px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 12vw;
        }
        .gif {
            max-inline-size: 100%;
        }
    }
    .response-code {
        font-weight: bold;
        font-size: 2rem;
    }
    a {
        color: #00CDCD;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
        transition-duration: 0.4s;
        &:hover {
            color: #FFE8B5;
        }
    }
`;

export default PageNotFound;