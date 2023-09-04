import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

import { allUsersRoute, host } from '../utils/apiRoutes';

import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState('');
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    const protectRoute = async () => {
        if(!localStorage.getItem('drift-user')) {
            navigate("/login");
        }
        else {
            setCurrentUser(await JSON.parse(localStorage.getItem('drift-user')));
            setIsLoaded(true);
        }
    };

    const getContacts = async () => {
            if(currentUser?.isAvatarImageSet) {
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                setContacts(data.data);
            }
            else {
                navigate('/setAvatar');
            }
    }

    useEffect(() => {
        protectRoute();
    },[]);

    useEffect(() => {
        if(currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
            getContacts();
        }
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {isLoaded && !!currentChat===false ? (
                    <Welcome currentUser={currentUser} />
                ) : (
                    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                )}

            </div>
            <footer>
                <div>
                    Made by <a href="https://github.com/ASmith-eng">Alex Smith</a>
                </div>
                <div>
                    <a href="https://www.flaticon.com/free-animated-icons/ocean" title="ocean animated icons">Ocean animated icons created by Freepik - Flaticon</a>
                </div>
            </footer>
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
    gap: 1rem;
    background-color: #1a2047;
    .container {
        height: 90vh;
        width: 90vw;
        display: grid;
        grid-template-columns: 25% 75%;
        background-color: transparent;
        border-radius: 0.8rem;
        box-shadow: 1px 2px 8px #070b21;
        -webkit-box-shadow: 1px 2px 8px #070b21;
        @media screen and (min-width: 720px) and (max-width: 1100px) {
            grid-template-columns: 35% 65%;
        }
    }
    footer {
        height: 0.8rem;
        width: 85%;
        display: flex;
        gap: 2rem;
        font-size: 0.8rem;
        color: white;
        a {
            color: #00CDCD;
        }
    }
`;

export default Chat