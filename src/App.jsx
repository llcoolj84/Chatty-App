import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navigation from './Navigation.jsx';
let newSocket = new WebSocket("ws:localhost:3001");

class App extends Component {
  constructor(props) {
    super(props);
    this.chatBox=this.chatBox.bind(this);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [] // messages will be added here as they get added 
    };
  }

  chatBox(newUser, newMessage) {

    let msg = {
      username: newUser,
      content: newMessage
    }; 
    
    newSocket.send(JSON.stringify(msg));
  }

//componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.
  componentDidMount() {
    newSocket.addEventListener('message', (event) =>{
      const allMessages = this.state.messages.concat(JSON.parse(event.data));
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: allMessages});
      console.log(allMessages);//just checking to see if it was given unique id
      document.getElementById('chatbarMessage').value = '';
    })    

    newSocket.onopen = function(){
        newSocket.send(JSON.stringify({content: 'You are now connected.'}));
    }
    
 // Receive all broadcasts and update state accordingly
  newSocket.onmessage = (broadcast) => {
    let broadcastMessage = JSON.parse(broadcast.data);

      switch(broadcastMessage.category) {
        case 'connection':
          let { count } = broadcastMessage;
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
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <ChatBar  chatBox={this.chatBox} currentUser= {this.state.currentUser}/>
          <MessageList messages={this.state.messages} />
        <Navigation/>
      </div>
    );
  }

}

export default App;
