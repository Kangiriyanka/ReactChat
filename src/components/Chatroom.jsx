
import { useState, useEffect } from 'react'

function Chatroom() {

    const [teams, setTeams] = useState({
        team1: [],
        team2: [],
        team3: [],
        team4: []
    });


    return (
        <>


 
        <div id="chat-submit-container">

            <h1> Kihoku Feud</h1>
            <input id="message-input" autocomplete="off" placeholder="Type your message ...">  </input>
            <button onClick={sendPublicMessage}> Send public message. </button>
            <button onClick={sendPrivatMessage} > Send private message. </button>

        </div>


        <div id="chat-container">
           
            <div id="team1" class="team-container">
                <h2> 👺 </h2>
                <ul id="messages-team1"></ul>
            </div>

            <div id="team2" class="team-container">
                <h2>⛩️</h2>
                <ul id="messages-team2"></ul>
            </div>

            <div id="team3" class="team-container">
                <h2>🍡</h2>
                <ul id="messages-team3"></ul>
            </div>

            <div id="team4" class="team-container">
            <h2>JOE👿</h2>
            <ul id="messages-team4"></ul>
            </div>
        </div>

    </>