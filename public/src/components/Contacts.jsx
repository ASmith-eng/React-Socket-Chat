import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/drift-high-resolution-logo-color-on-transparent-background.png';
import waves from '../assets/waves.svg';

export default function Contacts({contacts, currentUser, changeChat }) {
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentUserImage, setCurrentUserImage] = useState('');
    const [selected, setSelected] = useState('');

    useEffect(() => {
        if(currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUsername(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setSelected(index);
        changeChat(contact);
    };

    return (<>
        {
            currentUserImage && currentUsername && (
                <Container>
                    <div className="brand">
                        <img src={logo} alt="Drift logo" />
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <div className={`contact ${index===selected ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt={`${contact.username}'s avatar`} />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* <img src={waves} /> */}
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="Your avatar" />
                        </div>
                        <div className="username">
                            <h2>{currentUsername}</h2>
                        </div>
                    </div>
                </Container>
            )
        }
    </>);
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 12% 75% 13%;
    overflow: hidden;
    background-color: #070b21;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.6rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: grey;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            display: flex;
            color: white;
            background-color: #FFFFFF39;
            min-height: 4rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0rem 0.8rem;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar{
                height: 3rem;
                img {
                    height: 3rem;
                    width: 3rem;
                }
            }
            .username {
                h3 {
                    color: inherit;
                }
            }
        }
        .selected {
            color: #1a2047;
            background-color: #FFE8B5;
        }
    }
    .current-user {
        display: flex;
        padding: 0.2rem 0.6rem;
        background-color: #0f1433;
        align-items: center;
        gap: 2rem;
        .avatar {
            display: flex;
            align-items: center;
            img {
                height: 3.6rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                color: white;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1100px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
`;