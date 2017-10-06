// import react and components 
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

//declare new webSocket for connections on port 3001
var webSocket = new WebSocket('ws://localhost:3001');

function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

export default class App extends Component {

  // Send new chat message to server
  addMessage(newMessage) {
    newMessage.type = 'chat';
    newMessage.color = this.state.currentColor;
    newMessage.username = this.state.currentUser;
    webSocket.send(JSON.stringify(newMessage));
  };

  // Send notification of name change to server
  addUserName(newUserName) {
    let currentName = this.state.currentUser;
    // Checks if new username is identical to current one
    if (newUserName.username === currentName) {
      return;
    } else {
      //assign type property and color to system for notification 
      newUserName.type = 'system';
      newUserName.color = getRandomColor();
      newUserName.oldName = currentName;
      this.setState( {currentUser: newUserName.username} );
      this.setState( {currentColor: newUserName.color} );
      webSocket.send(JSON.stringify(newUserName));
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
      currentColor: 'black'

    };
  };

  // Called after component is rendered and attached to DOM, but not yet visible.
  componentDidMount() {

    webSocket.onopen = (webSocket) => {
      console.log('Successfully connected to the Chatty Server back end');
    };

    // Receive all broadcasts and update state accordingly
    webSocket.onmessage = (broadcast) => {
      let broadcastMessage = JSON.parse(broadcast.data);
      switch(broadcastMessage.type) {
        case 'connection':
          let { count, user } = broadcastMessage;
          this.setState( {users: count} );
        case 'system':
          let { username, oldName } = broadcastMessage;
          broadcastMessage.notification = (`**${oldName}** changed username to **${username}**`);
          this.setState( {messages: this.state.messages.concat(broadcastMessage)} );
          break;
        case 'chat':
          this.setState( {messages: this.state.messages.concat(broadcastMessage)} );
          break;
      };
    };

  };

  //rendering of the html in react
  render() {
    return (
      <div>
        <nav className='navbar'>
          <h1 className='navbar navbar-brand'>Chatty App</h1>
          <span className='navbar-users'>Users online: {this.state.users}</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          onNewMessage={this.addMessage.bind(this)}
          onNewUserName={this.addUserName.bind(this)}
          />
      </div>
    );
  };

};

