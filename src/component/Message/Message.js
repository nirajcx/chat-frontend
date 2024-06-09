import React from 'react';
import "./Message.css";

const Message = ({ user, message, classs }) => {
    return (
        <div className={`messageBox ${classs}`}>
            {user ? `${user}: ${message}` : `You: ${message}`}
        </div>
    );
};

export default Message;
