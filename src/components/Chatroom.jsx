
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


        socket.on('public message', handleIncomingMessage);
        socket.on('private message', handleIncomingPrivateMessage);

    
        return () => {
            socket.off('public message', handleIncomingMessage);
            socket.off('private message', handleIncomingPrivateMessage);
        };
    }, [socket]);

    function sendPublicMessage(message) {
        const trimmedMessage = message.trim();
        if (trimmedMessage === '') {
            alert('Please enter a short message without spaces ');
            return;
        }
        socket.emit('public message', { username, team, message: trimmedMessage });
        setMessage(''); 


        
    }

    function sendPrivateMessage(message) {
        const trimmedMessage = message.trim();
        if (trimmedMessage === '') {
            alert('Please enter a short message without spaces ');
            return;
        }
        socket.emit('private message', { username, team, message: trimmedMessage });
        setMessage(''); 
    }

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
            <input id="message-input" autoComplete="off" placeholder="Type your message ..." value = {message} 
                onChange={(e) => setMessage(e.target.value)}   /> 
            <button onClick={ () => sendPublicMessage(message)}> Send public message. </button>
            <button onClick={() => sendPrivateMessage(message)} > Send private message. </button>

        </div>


        <div id="chat-container">
        <button className="clear-button" onClick = {clearMessages}> Clear  </button>
           
            {Object.entries(teamMessages).map(([team]) => (
               
                <Chatbox key = {team} team={team} messages = {teamMessages[team]} username = {username}  onClear = {clearMessages}/>
            ))}
                
            
        </div>
     

    </>
    )
};
    

export default Chatroom;