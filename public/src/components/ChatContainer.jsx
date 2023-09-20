import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa';
import { FiCircle } from 'react-icons/fi';

import { sendMessageRoute, getAllMessagesRoute, getOnlineStatusRoute } from '../utils/apiRoutes';

import Logout from './Logout';
import Messages from './Messages';
import ChatInput from './ChatInput';

export default function ChatContainer({currentChat, currentUser, socket}) {
    const [conversation, setConversation] = useState([]);
    const [userOnline, setUserOnline] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const fetchChatMessages = async () => {
        const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id
        });
        setConversation(response.data);
    };

    const fetchOnlineStatus = async () => {
        const status = await axios.post(getOnlineStatusRoute, {
            userId: currentChat._id
        });
        setUserOnline(status.data);
    }

    useEffect(() => {
        if(socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg})
            });
            socket.current.on("contact-disconnect", (contactId) => {
                if(contactId===currentChat._id) setUserOnline(false);
            });
            socket.current.on("contact-connect", (contactId) => {
                if(contactId===currentChat._id) setUserOnline(true);
            })
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setConversation((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        if(currentChat) {
            fetchChatMessages();
            fetchOnlineStatus();
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
                            {userOnline ? (
                                <div className="status online" title="Online">
                                    <FaCircle />
                                </div>
                            ) : (
                                <div className="status offline" title="Offline">
                                    <FiCircle />
                                </div>
                            )}
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
    grid-template-rows: 12% 77% 11%;
    border-radius: 0 0.8rem 0.8rem 0;
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        background-color: #070b21;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.2rem 1rem;
            border-radius: 0.4rem;
            background: rgb(204,173,105);
            background: linear-gradient(54deg, rgba(204,173,105,1) 0%, rgba(219,191,128,1) 45%, rgba(255,232,181,1) 100%);
            .avatar {
                height: 2.5rem;
                img {
                    height: 2.5rem;
                }
            }
            .username {
                h3 {
                    color: #070b21;
                }
            }
            .status {
                display: flex;
                align-items: center;
            }
            .online {
                svg {
                    color: green;
                }
            }
            .offline {
                svg {
                    color: #040718;
                }
            }
        }
    }
`;