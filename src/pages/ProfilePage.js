// src/pages/ProfilePage.js
import React from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const photos = [
        "https://media.licdn.com/dms/image/v2/D5603AQEVYA-wtdf9qw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721482236579?e=1735776000&v=beta&t=NNk7QP_Ig4EnZkYWmLflDNbv57UfXUUp8mu5Nn2EX28",
        "https://media.licdn.com/dms/image/v2/D5603AQGMtiBQASgjKw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728827034203?e=1735776000&v=beta&t=BFpYKQ2Vj532ZEAdr8f0xZXcFIsiftg38W_XEQhLc30",
        "https://media.licdn.com/dms/image/v2/D5635AQEAySbngwwftA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1725991586422?e=1731171600&v=beta&t=qU_OyYMENxLbjaVXogRjQbLRfGhq6zwPi-j-pz8oDyU",
        "https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2Frzky.jpeg?alt=media",
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                paddingBottom: "80px",
                background: "#ffffff",
                minHeight: "100vh"
            }}
        >
            <div style={{
                padding: "20px",
                marginTop: "20px"
            }}>
                <motion.div 
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    style={{
                        background: "white",
                        borderRadius: "20px",
                        padding: "30px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <motion.img 
                        whileHover={{ scale: 1.05 }}
                        src="https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2Fanimek.jpg?alt=media"
                        alt="Profile" 
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            marginBottom: "15px",
                            border: "4px solid white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}
                    />
                    <h2 style={{ 
                        marginBottom: "5px",
                        fontSize: "26px",
                        fontWeight: "700",
                        color: "#333"
                    }}>Kelompok Sembilan</h2>
                    <p style={{ 
                        color: "#64748b",
                        fontSize: "16px",
                        marginBottom: "20px"
                    }}>@Kelompok 9</p>

                    {/* Stats Section */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        margin: "20px 0",
                    }}>
                        {[
                            { label: "Posts", value: "120" },
                            { label: "Followers", value: "1.5K" },
                            { label: "Following", value: "890" }
                        ].map((stat, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ y: -5 }}
                                style={{ textAlign: "center" }}
                            >
                                <div style={{ 
                                    fontWeight: "700",
                                    fontSize: "24px",
                                    color: "#1e293b",
                                    marginBottom: "5px"
                                }}>{stat.value}</div>
                                <div style={{ 
                                    color: "#64748b",
                                    fontSize: "14px"
                                }}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <p style={{ 
                        color: "#334155",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        textAlign: "center",
                        maxWidth: "400px"
                    }}>
                        This is my bio description. I love photography and travel.
                    </p>

                    {/* Action Buttons */}
                    <div style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px"
                    }}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: "12px 24px",
                                background: "#6366F1",
                                color: "white",
                                border: "none",
                                borderRadius: "12px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            Edit Profile
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: "12px 24px",
                                background: "white",
                                color: "#6366F1",
                                border: "2px solid #6366F1",
                                borderRadius: "12px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            Share Profile
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Photos Grid */}
            <div style={{
                padding: "20px",
                marginTop: "20px"
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "15px",
                }}>
                    {photos.map((photo, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            style={{
                                paddingBottom: "100%",
                                position: "relative",
                                borderRadius: "15px",
                                overflow: "hidden",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <img 
                                src={photo}
                                alt={`Post ${index + 1}`}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}