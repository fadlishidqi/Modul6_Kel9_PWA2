import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card";
import Modal from "../components/modal";
import { saveData, getData } from '../db';
import '../App.css';

export default function LandingPage() {
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("One Piece");
    const [modalShow, setModalShow] = useState(false);
    const [modalItem, setModalItem] = useState(null);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    // Monitor status koneksi
    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        const fetchData = async (query) => {
            setIsLoading(true);
            setError(null);

            try {
                // Coba ambil data dari IndexedDB terlebih dahulu
                const cachedData = await getData(query);
                
                if (isOffline) {
                    if (cachedData) {
                        setData(cachedData);
                        setIsLoaded(true);
                        setIsLoading(false);
                        return;
                    } else {
                        throw new Error("No cached data available offline");
                    }
                }

                // Jika online, fetch dari API
                const response = await axios.get("https://imdb8.p.rapidapi.com/auto-complete", {
                    params: { q: query },
                    headers: {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key": "cb78fd55c7mshe5cb23870748621p190809jsn672c4a237919",
                    },
                });

                if (response.status === 200) {
                    if (response.data && response.data.d && response.data.d.length > 0) {
                        setData(response.data);
                        // Simpan data ke IndexedDB untuk penggunaan offline
                        await saveData(query, response.data);
                    } else {
                        setError("No results found");
                        setData(null);
                    }
                    setIsLoaded(true);
                }
            } catch (err) {
                console.error('Error:', err);
                
                // Cek apakah ada data di cache saat error
                const cachedData = await getData(query);
                if (cachedData) {
                    console.log('Using cached data');
                    setData(cachedData);
                    setIsLoaded(true);
                } else {
                    setError(isOffline ? "You are offline and no cached data is available" : "An error occurred while fetching data");
                    setData(null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (!isLoaded) {
            fetchData(query);
        }
    }, [isLoaded, query, isOffline]);

    const onSearch = (e) => {
        if (e.key === "Enter") {
            setIsLoaded(false);
            setQuery(e.target.value);
            setData(null);
        }
    };

    const handleClick = (item) => {
        setModalShow(!modalShow);
        setModalItem(item);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="card-container">
                    {[1, 2, 3, 4].map((_, index) => (
                        <Card key={index} data={null} />
                    ))}
                </div>
            );
        }

        if (error) {
            return <p style={{ textAlign: 'center', color: '#666' }}>{error}</p>;
        }

        if (!data || !data.d) {
            return <p style={{ textAlign: 'center', color: '#666' }}>No results found</p>;
        }

        return (
            <div className="card-container">
                {data.d.map((item, index) => (
                    <Card
                        data={item}
                        key={index}
                        onClick={() => handleClick(item)}
                    />
                ))}
            </div>
        );
    };

    return (
        <main>
            {isOffline && (
                <div style={{ 
                    background: '#fff3cd', 
                    padding: '10px', 
                    textAlign: 'center',
                    marginBottom: '10px'
                }}>
                    You are currently offline. Showing cached data if available.
                </div>
            )}
            <input
                type="text"
                placeholder="Search film by name"
                onKeyDown={onSearch}
            />
            <h3 className="title">Search: {query}</h3>
            {renderContent()}
            <Modal
                data={modalItem}
                isShow={modalShow}
                onCancel={() => setModalShow(false)}
            />
        </main>
    );
}