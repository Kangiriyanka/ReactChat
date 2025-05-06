import express from 'express'
import { readFileSync} from 'fs'
import { createServer  } from  'https'
import { Server } from 'socket.io'

const app = express();
const key = readFileSync('./backend/localhost+3-key.pem');
const cert = readFileSync('./backend/localhost+3.pem');



// Wrap our server with the Socket.io server 

var httpsServer = createServer({ key, cert }, app);
const io = new Server(httpsServer, {
  cors: {
    origin: ["https://localhost:5173", "https://192.168.2.188:5173"], // Allow specific origins
    methods: ["GET", "POST"], // Allow specific HTTP methods
    allowedHeaders: ["my-custom-header", "Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow cookies and credentials
  },
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





// Passing "0.0.0.0" as the host allows the server to be accessible from any IP address
httpsServer.listen(3000,  '0.0.0.0', () => {
  console.log('server running at https://localhost:3000');
});