
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../assets/Homepage.css'

function Homepage({onLogin}) {


    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [team, setTeam] = useState('team1');
    
    
    /**
     * Validate the username and make the user join the appropriate team
     * Create a socket connection and join the team
     * Redirect to the chat page
     */
    function handleLogin() {
        if (username.trim() === '') {
            alert('Please enter a username without spaces');
            return;
        }
        // I am a client that wants to connect to the server on localhost:3000
      
        onLogin(username, team);
        navigate(`/chatroom/${username}/${team}`);
        
    }


    return (
        <div>
             <h1 > Christmas Chat  </h1>
          
            <div id="username-container">
            <h2 style ={{color: "white"}}> Choose a username and team</h2>
            <div className = "username-team-box">
            <label htmlFor="username-input"> </label>
            <input 
                id="username-input" 
                autoComplete="off" 
                placeholder="Username" 
                value = {username} 
                onChange={(e) => setUsername(e.target.value)} 
            
            />
            
            <label htmlFor="team-dropdown"></label>
                <select id="team-dropdown"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                >
                    <option value="team1">Team 1</option>
                    <option value="team2">Team 2</option>
                    <option value="team3">Team 3</option>
                    <option value="team4">Team 4</option>
                    
                </select>
            </div>
            <div>

           
              
           
            </div>
            <button style ={{ }} onClick={handleLogin}>Submit</button>
            </div>
        </div>
    )
}

export default Homepage;