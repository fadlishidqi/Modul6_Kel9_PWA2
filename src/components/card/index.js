import React from "react"; 
import "./index.css"; 

export default function Card({ data, onClick }) { 
   const hasImage = data && data.i && data.i.imageUrl;

   // Hapus pengecekan hasImage di handleClick
   const handleClick = () => {
       if (onClick) {  // Hanya cek apakah onClick ada
           onClick();
       }
   };

   return ( 
       <div className="card" onClick={handleClick}> 
           {data ? ( 
               <> 
                   <figure className="card-image"> 
                   <img 
                       src={hasImage ? data.i.imageUrl : "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="} 
                       alt={data?.l || "No Title"}
                   /> 
                   </figure> 
                   <div className="card-info"> 
                       <h3>{data?.l || "No Title"}</h3>
                       <p>{data?.q || "No Description"}</p>
                   </div> 
               </> 
           ) : ( 
               <>
                   <div className="card-image loading-container">
                       <div className="loading-spinner"></div>
                   </div>
                   <div className="card-info">
                       <div className="placeholder-text"></div>
                       <div className="placeholder-text"></div>
                   </div>
               </> 
           )} 
       </div> 
   ); 
}