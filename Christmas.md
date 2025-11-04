**
Copy paste to Obsidian if you want to see the callouts.**

> [!tip] Goal: Being patient with the documentation, cutting down the complexity even further. Not trying to get it.

> [!tip] Takeaway: socket.emit("event A", giveA)  ---> Io.on(eventA, do something with GivenA)


### Questions I asked myself


> [!question] What is the distinction in the original app of app.py & chat.js?
> Python was rendering the HTML and handling the server , but to actually use the javascript in the html, I need to use Chat.JS. With React , I can just use it directly



> [!question] What is the distinction io.emit and socket.emit
> Broadcast for everyone or just to a specific client


> [!question] What is the 0.0.0.0?
> An IP address that tells the server to listen to any IP address to establish a connection



> [!question] What is the IP of the backend server?
> localhost or 127.0.0.1 refers to the current PC. 
> If I am the client (on my own pc), my client is on the same IP but on a different port
> If I am on a different device on the same network (192.168.2.188:5173), I access the backend using 192.168.2.188:3000




### Bugs

> [!bug]  import { io } from 'socket.io-client';

> [!bug]  Every time you use setState, you re-render the component, that's why you simply don't mutate the data directly

> [!bug]  Syntax with using the ... operator 

> [!bug]  Implicit returns with the map function

> [!bug]  Send a message to the server and then the server updates the UI. The client should only re-render when the server sends a message

> [!bug]  Filtering private messages could work well on the client side , but you still need to use io.to(room).emit

> [!bug]  Props in React are read-only

> [!bug]  useNavigate only works inside a Routes component

> [!bug] Loading Mixed Content -> FrontEnd was using HTTPS but Backend was using HTTP



### References that make sense

https://socket.io/how-to/use-with-react
https://react.dev/reference/react/useEffect
https://docs.oracle.com/javase/tutorial/networking/sockets/definition.html
https://socket.io/docs/v4/client-api/#socket
https://socket.io/docs/v4/rooms/
https://flexboxfroggy.com/
https://stackoverflow.com/questions/69417788/vite-https-on-localhost
https://socket.io/docs/v4/client-api/#socketoneventname-callback


> [!NOTE] What is the io in SocketIO
> 

> [!NOTE] Components not appearing could be due to forgetting the import

> [!NOTE] SocketIO is composed of two parts. In your words, what are they?

> [!NOTE] Object.assign in Javascript. 

> [!NOTE] Tools like MkCert & Ngork




