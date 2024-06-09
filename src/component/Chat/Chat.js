import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import './Chat.css';
import sendLogo from '../../images/send.png';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from '../../images/closeIcon.png';

let socket;

const ENDPOINT = "https://chat-backend-7ong.onrender.com/:4500/";

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setUser(storedUser);

        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setId(socket.id);
            socket.emit('joined', { user: storedUser });
        });

        socket.on('welcome', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('userJoined', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('leave', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('sendMessage');
        };
    }, [messages]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        if (message.trim()) {
            socket.emit('message', { message, id, user });
            document.getElementById('chatInput').value = "";
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            send();
        }
    };

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>Chat Application</h2>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message
                            key={i}
                            user={item.id === id ? '' : item.user}
                            message={item.message}
                            classs={item.id === id ? 'right' : 'left'}
                        />
                    ))}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input
                        onKeyDown={handleKeyDown}
                        type="text"
                        id="chatInput"
                        placeholder="Type a message..."
                    />
                    <button onClick={send} className="sendBtn">
                        <img src={sendLogo} alt="Send" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
