import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { AiFillSmile } from 'react-icons/ai';

export default function ChatInput({handleSendMessage}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmojiPickerShowHide = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emoji) => {
        let updatedString = message;
        updatedString += emoji.emoji;
        setMessage(updatedString);
    }

    const sendChat = (event) => {
        event.preventDefault();

        if(message.length>0) {
            handleSendMessage(message);
            setMessage('');
        }
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <AiFillSmile onClick={handleEmojiPickerShowHide} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} searchPlaceholder='Search' />}
                </div>
            </div>
            <form className="input-container" onSubmit={(event) => sendChat(event)}>
                <input
                    type="text"
                    placeholder="Type your message here"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #040718;
    padding: 0.3rem 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00C8;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -350px;
                background-color: #FFFFFF39;
                border: 0.2rem solid white;
                box-shadow: none;
                -webkit-box-shadow: none;
                .active-category-indicator {
                    background-color: #00CDCD;
                }
                .emoji-categories {
                    button {
                        color: white;
                    }
                }
                .emoji-search {
                    background-color: transparent;
                    border-color: white;
                }
                .emoji-group:before {
                    colorL white;
                    background-color: transparent;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        background-color: #FFFFFF39;
        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding: 0.2rem 0;
            padding-left: 1rem;
            font-size: 1rem;
            &:selection {
                background-color: #FFE8B5;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 1.8rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #00CDCD;
            border: none;
            cursor: pointer;
            transition: 0.2s ease-in-out;
            color: white;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg {
                    font-size: 1rem;
                }
            }
            svg {
                color: inherit;
                font-size: 1.8rem;
            }
            &:hover {
                color: #040718;
                background-color: #FFE8B5;
            }
        }
    }
`;