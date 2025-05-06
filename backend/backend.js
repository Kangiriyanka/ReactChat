import express from 'express'
import { createServer  } from 'http'
import { Server } from 'socket.io'

const app = express();



// Wrap our server with the Socket.io server 
var server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
   
  },
});

/**
 * The client attemps to connects to the server
 * The server accepts the clients information, query in this case through socket.handshake.query
 * The socket joins the appropriate team room and the server emits a message to the client telling that the connection was successful
 * 
 * The server listens to public and private messages from the client with socket.on("public message") and socket.on("private message")
 */ 

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
    
    // Specific to the team with io.to(team)
    io.to(team).emit('private message', { team, message: { username: `㊙️ ${username}`, text: message}});
   

  });

  
 
});




// Passing "0.0.0.0" as the host allows the server to be accessible from any IP address
server.listen(3000,  '0.0.0.0', () => {
  console.log('server running at http://localhost:3000');
});