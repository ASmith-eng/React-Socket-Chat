import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import loader from "../assets/loader.gif";
import { setAvatarRoute } from "../utils/apiRoutes";

const Buffer = require('buffer/').Buffer;

const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
};

export default function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState();

    async function fetchAvatars() {
        const data = [];
        try {
            for(let i=0; i<4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random()*1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
        } catch {
            console.log("Error occurred fetching avatars");
        }
        setAvatars(data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchAvatars();
    }, []);

    const setProfilePicture = async () => {

    };
    
    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>Pick an avatar for your profile picture</h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, i) => {
                            return (
                                <div key={i} className={`avatar ${selectedAvatar===i? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(i)} />
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #1a2047;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: white;
            font-weight: 500;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: 0.4s ease-in-out;
            img {
                height: 6rem;
            }
        }
        .selected {
            border: 0.4rem solid #00CDCD;
        }
    }
`;