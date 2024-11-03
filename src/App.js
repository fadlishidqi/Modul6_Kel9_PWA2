// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/header";
import BottomBar from "./components/bottombar";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
                <BottomBar />
            </Router>
        </div>
    );
}

export default App;