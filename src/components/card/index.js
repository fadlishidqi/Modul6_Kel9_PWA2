import React from "react"; 
import "./index.css"; 

export default function Card({ data, onClick }) { 
   const hasImage = data && data.i && data.i.imageUrl;

   const handleClick = () => {
       if (hasImage && onClick) {
           onClick();
       }
   };

   return ( 
       <div className="card" onClick={handleClick}> 
           {data ? ( 
               <> 
                   <figure className="card-image"> 
                   <img 
                           src={hasImage ? data.i.imageUrl : "https://via.placeholder.com/175x170?text=No+Image"} 
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