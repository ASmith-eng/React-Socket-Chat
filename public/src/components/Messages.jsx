import React from 'react';
import styled from 'styled-components';

export default function Messages({conversation}) {
    return (
        <>
            <Container>
                {
                    conversation.map((message) => {
                        return (
                            <div>
                                <div className={`message ${message.fromSelf ? "sent" : "received"}`}>
                                    <div className="content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Container>
        </>
    )
}

const Container = styled.div`
    height: 80%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
        display: flex;
        align-items: center;
        .content {
            max-width: 45%;
            overflow-wrap: break-word;
            padding: 0.5rem 1rem;
            font-size: 1.1rem;
            border-radius: 0.6rem;
            color: white;
        }
    }
    .sent {
        justify-content: flex-end;
        .content {
            background-color: #00CDCD;
        }
    }
    .received {
        justify-content: flex-start;
        .content {
            background-color: #FFFFFF39;
        }
    }
`;