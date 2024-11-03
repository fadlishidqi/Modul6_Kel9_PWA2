// src/components/bottombar/index.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import "./index.css";

export default function BottomBar() {
    const location = useLocation();

    return (
        <div className="bottom-bar">
            <Link to="/" className={`bottom-bar-item ${location.pathname === "/" ? "active" : ""}`}>
                <AiOutlineHome size={24} />
                <span>Home</span>
            </Link>
            <Link to="/profile" className={`bottom-bar-item ${location.pathname === "/profile" ? "active" : ""}`}>
                <AiOutlineUser size={24} />
                <span>Profile</span>
            </Link>
        </div>
    );
}