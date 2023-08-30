import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { sendMessageRoute, getAllMessagesRoute } from '../utils/apiRoutes';

import Logout from './Logout';
import Messages from './Messages';
import ChatInput from './ChatInput';

export default function ChatContainer({currentChat, currentUser, socket}) {
    const [conversation, setConversation] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const fetchChatMessages = async () => {
        const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id
        });
        setConversation(response.data);
    };

    useEffect(() => {
        if(socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg})
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setConversation((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        if(currentChat) {
            fetchChatMessages();
        }
    }, [currentChat]);

    const handleSendMessage = async (message) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: message
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            msg: message
        });

        const messages = [...conversation];
        messages.push({fromSelf: true, message: message});
        setConversation(messages);
    };

    return (
        <Container>
            {currentChat && (
                <>
                    <header className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt={`${currentChat.username}'s avatar`} />
                            </div>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        <Logout />
                    </header>
                    <Messages conversation={conversation} />
                    <ChatInput handleSendMessage={handleSendMessage} />
                </>
            )}
        </Container>
    )
}

const Container = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-rows: 10% 79% 11%;
    border-radius: 0 0.8rem 0.8rem 0;
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem 2rem 0 2rem;
        background-color: #F5F68C;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                height: 3rem;
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: #070b21;
                }
            }
        }
    }
`;