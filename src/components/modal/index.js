// src/components/modal/index.js
import React from "react"; 
import "./index.css"; 

export default function Modal({ isShow, data, onCancel }) { 
    if (!isShow) return null;

    const isDataEmpty = (data) => {
        return !data || 
               (!data.l && !data.q && !data.y && !data.s && !data.i?.imageUrl);
    };

    return ( 
        <div className="modal-container">
            <div className="modal-bg" onClick={onCancel}></div>
            <div className="modal">
                {!isDataEmpty(data) ? (
                    <div className="modal-content">
                        <img
                            src={data.i?.imageUrl || "https://via.placeholder.com/200x300?text=No+Image"}
                            alt={data.l || "No Title"}
                            className="modal-image"
                        />
                        <div className="modal-info">
                            <h3>Data Information</h3>
                            <div className="info-details">
                                <p className="info-row">
                                    <span className="info-label">Judul: </span>
                                    <span className="info-value">
                                        {data.l || "Data tidak tersedia"}
                                    </span>
                                </p>
                                <p className="info-row">
                                    <span className="info-label">Format: </span>
                                    <span className="info-value">
                                        {data.qid || data.q || "Data tidak tersedia"}
                                    </span>
                                </p>
                                <p className="info-row">
                                    <span className="info-label">Tahun rilis: </span>
                                    <span className="info-value">
                                        {data.y || "Data tidak tersedia"}
                                    </span>
                                </p>
                                <p className="info-row">
                                    <span className="info-label">Pengarang: </span>
                                    <span className="info-value">
                                        {data.s || "Data tidak tersedia"}
                                    </span>
                                </p>
                            </div>
                            <button className="close-button" onClick={onCancel}>
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>Data tidak ditemukan</p>
                        <button className="close-button" onClick={onCancel}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    ); 
}