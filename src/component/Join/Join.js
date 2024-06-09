import React, { useState } from "react";
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Join = () => {
    const [name, setName] = useState("");

    const handleLogin = () => {
        localStorage.setItem("user", name);
    };

    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src={logo} alt="logo" />
                <h1>Chat Application</h1>
                <input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    type="text"
                    id="joinInput"
                    value={name}
                />
                <Link
                    onClick={(event) => (!name ? event.preventDefault() : handleLogin())}
                    to="/chat"
                >
                    <button className="joinbtn">Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
