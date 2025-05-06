
import { useState, useEffect } from 'react'
import '../assets/Chatroom.css'
import Chatbox from './Chatbox.jsx'
function Chatroom( {socket, username, team}) {

    // This is the state that will hold the messages for each team
    const [message, setMessage] = useState('');
    const [teamMessages, setTeamMessages] = useState({
        team1: [],
        team2: [],
        team3: [],
        team4: []
    });

    
    useEffect(() => {

        const handleIncomingMessage = ({  team: incomingTeam, message: incomingMessage }) => {
            setTeamMessages(prev => ({
              
                ...prev,
                [incomingTeam]: [...prev[incomingTeam], incomingMessage]
            }));
        };

        const handleIncomingPrivateMessage = ({ team: incomingTeam, message: incomingMessage }) => {
            if (team !== incomingTeam) {
                return;
            }
            setTeamMessages(prev => ({
                ...prev,
                [incomingTeam]: [...prev[incomingTeam], incomingMessage]
            }));
        }

        
        // Event name, listener function
        // When you do socket.emit from the server, it passes args to the client
        // handleIncomingMessage receives its args from the server

        socket.on('public message', handleIncomingMessage);
        socket.on('private message', handleIncomingPrivateMessage);

        // Clean up the event listeners
        return () => {
            socket.off('public message', handleIncomingMessage);
            socket.off('private message', handleIncomingPrivateMessage);
        };
    }, [socket]);

    // Send an event called public message to the server, and when the server sends back the message
    // The useEffect will update the state of the message
    function sendPublicMessage(message) {
        const trimmedMessage = message.trim();
        if (trimmedMessage === '') {
            alert('Please enter a short message without spaces ');
            return;
        }
        socket.emit('public message', { username, team, message: trimmedMessage });
        setMessage(''); 


        
    }


    // Send an event called private message to the server, and when the server sends back the message
    // The useEffect will update the state of the message
    function sendPrivateMessage(message) {
        const trimmedMessage = message.trim();
        if (trimmedMessage === '') {
            alert('Please enter a short message without spaces ');
            return;
        }
        socket.emit('private message', { username, team, message: trimmedMessage });
        setMessage(''); 
    }


    // Clear the messages for all teams

    function clearMessages() {
    
        setTeamMessages({
            team1: [],
            team2: [],
            team3: [],
            team4: []
        });

    }


    return (
        <>
        
        <div id="chat-submit-container">
            

            <h1> Kihoku Feud</h1>
            <button  style = {{margin: "1rem", width: "12rem"}} className="clear-button" onClick = {clearMessages}> Clear Messages  </button>
            <input id="message-input" autoComplete="off" placeholder="Type your message ..." value = {message} 
                onChange={(e) => setMessage(e.target.value)}   /> 
            <div style= {{display: "flex", justifyContent: "center", gap: "1rem"}}>
             {/* Remember to pass a reference to the function and not just the function otherwise it will execute it. */}
            <button onClick={ () => sendPublicMessage(message)}> Send public message. </button>
            <button onClick={() => sendPrivateMessage(message)} > Send private message. </button>
            </div>

        </div>


        <div id="chat-container">
       
           
            {Object.entries(teamMessages).map(([team]) => (
               
                <Chatbox key = {team} team={team} messages = {teamMessages[team]} username = {username}  onClear = {clearMessages}/>
            ))}
                
            
        </div>
     

    </>
    )
};
    

export default Chatroom;