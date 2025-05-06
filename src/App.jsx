import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import { io } from 'socket.io-client';
import Homepage from './components/Homepage';
import Chatroom from './components/Chatroom';


function App() {

  
  const [socket, setSocket] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const backendURL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000' 
      : `http://${window.location.hostname}:3000`; 
   

  // The username and team will be passed back from the Homepage component
  function handleLogin(username, selectedTeam) {
    console.log(backendURL)
    // Creates a communication channel between the client (the user on the browser) and the server (the server running on localhost:3000)
    // The backend server we connect to is running on localhost:3000 or 192.168
    const newSocket = io(backendURL, { query: { username: username, selectedTeam: selectedTeam } } );
    setSocket(newSocket)
    
    // Once socket is connected to the server, we can emit the username and team to the server 
    // Connect is not a NAMESPACE
    newSocket.on('connect', () => {
  
      setSocket(newSocket)
      setUserInfo({ username: username, team: selectedTeam });
      
    }
    
  
  )
}


  return (
    <>
      <Router> 
        <Routes>
          <Route exact path="/" element={<Homepage onLogin={handleLogin} />} />
          <Route exact path="/chatroom/:username/:team" element={ userInfo ? <Chatroom socket={socket} username={userInfo?.username} team={userInfo?.team} /> : <div style = {{padding: "1rem", fontSize: "2rem" , fontWeight: "bold"} }> To be implemented in a far future </div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
