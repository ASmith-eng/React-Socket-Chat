import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import seaweed from '../assets/seaweed.gif';

export default function Messages({conversation}) {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    }, [conversation]);

    return (
        <>
            <Container>
                {conversation?.length ? (
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
                ) : (
                    <div className="no-messages">
                        <div className="gif-container">
                            <img src={seaweed} alt="Seaweed moving in the ocean currents" />
                        </div>
                        <h1>
                            No messages yet!
                        </h1>
                    </div>
                )}
            </Container>
        </>
    )
}

const Container = styled.div`
    padding: 0rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    background: rgb(7,11,33);
    background: linear-gradient(0deg, rgba(7,11,33,1) 0%, rgba(9,9,121,0.8) 34%, rgba(7,60,155,0.8) 56%, rgba(5,98,168,0.8) 66%, rgba(0,205,205,0.8) 88%, rgba(245,246,140,1) 99%);
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
    .no-messages {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        color: white;
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
    }
`;