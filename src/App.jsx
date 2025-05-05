import React, { useState } from 'react';
import Homepage from './components/Homepage';
import Chatroom from './components/Chatroom';


import { io } from 'socket.io-client';

function App() {

  const [socket, setSocket] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // The username and team will be passed back from the Homepage component
  function handleLogin(username, selectedTeam) {
    // Creates a communication channel between the client (the user on the browser) and the server (the server running on localhost:3000)
    const newSocket = io('http://localhost:3000', { query: { username: username, selectedTeam: selectedTeam } } );
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
      { userInfo ? 
        <Chatroom socket={socket} username = {userInfo.username} team= {userInfo.team} /> :
        <Homepage onLogin={handleLogin} />
      }
    </>
  )
}

export default App;
