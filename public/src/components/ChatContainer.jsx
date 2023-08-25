import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { sendMessageRoute, getAllMessagesRoute } from '../utils/apiRoutes';

import Logout from './Logout';
import Messages from './Messages';
import ChatInput from './ChatInput';

export default function ChatContainer({currentChat, currentUser}) {
    const [conversation, setConversation] = useState([]);

    const fetchChatMessages = async () => {
        const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id
        });
        setConversation(response.data);
    };

    useEffect(() => {
        fetchChatMessages();
    }, [currentChat]);

    const handleSendMessage = async (message) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: message
        })
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
    padding-top: 1rem;
    overflow: hidden;
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
    }
`;