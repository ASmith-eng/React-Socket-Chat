import React from 'react';
import styled from 'styled-components';

import Logout from './Logout';

export default function ChatContainer({currentChat}) {
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
                    <div className="chat-messages"></div>
                    <div className="chat-input"></div>
                </>
            )}
        </Container>
    )
}

const Container = styled.div`
    padding-top: 1rem;
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