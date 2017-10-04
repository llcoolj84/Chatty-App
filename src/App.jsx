import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navigation from './Navigation.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          key: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          key: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.chatBox=this.chatBox.bind(this);
  }

  chatBox(newUser, newMessage) {
    console.log("componentDidMount <App />");
    // console.log(messages);
      console.log(newMessage + '!!!!!!' + newUser);
      let newKey = this.state.messages.length + 1;
      // Add a new message to the list of messages in the data store
      const latestMessage = {key: newKey, username: newUser, content: newMessage};
      const messages = this.state.messages.concat(latestMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
      document.getElementById('chatbarMessage');

  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <ChatBar  chatBox={this.chatBox} currentUser= {this.state.currentUser} messages={this.state.messages}/>
          <MessageList messages={this.state.messages} />
        <Navigation/>
      </div>
    );
  }
}

export default App;
