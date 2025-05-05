import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express();
const server = createServer(app);
// Wrap our server with the Socket.io server 
const io = new Server(server, {
  cors: {
    // Allow only this origin 
    origin: "http://localhost:5173"
  }
});


io.on('connection', (socket) => {
  
  const {username, selectedTeam} = socket.handshake.query;

  console.log(socket.id + 
    ': A user with username ' + 
    socket.handshake.query.username + ' joined ' + 
    socket.handshake.query.selectedTeam +  ' connected to the server');

  socket.join(selectedTeam)
  socket.emit('connected', { username: username, team: selectedTeam });

  socket.on('public message', (data) => {
    console.log(data);
    const { username, team, message } = data;
    console.log('Public message from ' + username + ' in team ' + team + ': ' + message);
    io.emit('public message', { team: team, message: { username: username, text: message }});
  
    
  });

  socket.on('private message', (data) => {
    const { username, team, message } = data;
    console.log('Private message from ' + username + ' in  ' + team + ': ' + message);
    
    io.to(team).emit('private message', { team, message: { username: `㊙️ ${username}`, text: message}});
   

  });

  
 
});






server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});