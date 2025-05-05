import { useState } from 'react';

function Chatbox({team, messages}) {

   
    const names  = { team1: "🍡", team2: "🍣",　team3: "👺",  team4: "💰"};
    /**
     * This function is used to display the chatbox for each team.
     */
    return ( 
    <>
    <div id={team} className="team-container">
    
    
    <h2> {names[team]} </h2> 
  
    <ul id={`messages-${team}`}>
    {messages.map((message, index) => (
        <li key={index} className="message">
           {`${message.username}: ${message.text}`}
        </li>
    ))}
    </ul>

    </div>
    </>

)

}


export default Chatbox;