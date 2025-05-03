
import { useState, useEffect } from 'react'
import io from 'socket.io-client'


function Homepage() {

    const [username, setUsername] = useState('');
    const [team, setTeam] = useState('team1');
    const [socket, setSocket] = useState(null);
    
    
    /**
     * Validate the username and make the user join the appropriate team
     * Create a socket connection and join the team
     * Redirect to the chat page
     */
    function handleSubmit() {
        if (username.trim() === '') {
            alert('Please enter a valid username.');
            return;
        }
        // The server the client is connecting to 
        const newSocket = io.connect('http://192.168.2.84:4000', { query: { username: username } });
        setSocket(newSocket);

        newSocket.on('connect', function () {
            newSocket.emit('join', { username: username, team: team });
            window.location.href = 'chat?team=' + team + '&username=' + username;

        });
        
    }


    return (
        <div>
            <div id="username-container">
            <h1 > Christmas Chat Game </h1>

            <label for="username-input">Enter your username:</label>
            <input 
                id="username-input" 
                autocomplete="off" 
                placeholder="Username" 
                value = {username} 
                onChange={(e) => setUsername(e.target.value)} 
            
            />
            <div id="team-selection">
                <label for="team-dropdown">Choose a Team:</label>
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
            <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Homepage;