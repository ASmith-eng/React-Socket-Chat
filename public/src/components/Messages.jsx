import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function Messages({conversation}) {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    }, [conversation]);

    return (
        <>
            <Container>
                {
                    conversation.map((message) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()}>
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
    &::webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
            background-color: #FFFFFF39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
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